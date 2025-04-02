import { where } from "sequelize";
import userModel from "../models/userModel.js";
import {
  generateSalt,
  hashPassword,
  isValidCredentials,
} from "../utils/encryption.js";
import { registrationSchema } from "../utils/validations/userSchema.js";

export async function register(req, res) {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ where: { email } });

  if (req.session.user?.isLogged) {
    return res.status(403).json("You're already logged in");
  }

  try {
    const validationResults = registrationSchema.safeParse(req.body);

    if (!validationResults.success) {
      return res.status(400).json({ error: validationResults.error.issues });
    }

    if (findUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exist" });
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const user = await userModel.create({
      email,
      hashedPassword,
      salt,
    });

    res
      .status(201)
      .json({ message: "Registration was successful", session: req.session });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function logout(req, res) {
  if (!req.session.user?.isLogged)
    return res.status(403).json({ message: "Your not logged in" });

  req.session.destroy(() => {
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "You logged out successfully" });
  });
}

export async function login(req, res) {
  if (req.session.user?.isLogged)
    return res.status(403).json({ message: "Your already logged in" });

  const { email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ where: { email } });

    if (!findUser) return res.status(404).json({ message: "User not found" });

    if (!isValidCredentials(password, findUser.salt, findUser.hashedPassword))
      return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = {
      id: findUser.id,
      email: findUser.email,
      admin: findUser.admin,
      isLogged: true,
    };

    return res
      .status(200)
      .json({ message: "Logged in successfully", session: req.session });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSessionData(req, res) {
  if (!req.session.user?.isLogged) {
    return res.status(401).json({ message: "Not logged in", isLogged: false });
  }

  try {
    if (!req.session.user?.id) {
      res.status(404).json({ message: "User is not defined" });
    }

    const freshUserData = await userModel.findOne({
      where: { id: req.session.user.id },
      attributes: ["id", "email", "admin"],
    });

    const userData = freshUserData
      ? freshUserData.get({ plain: true })
      : req.session.user;

    res.status(200).json({
      message: "User session data retrieved",
      user: userData,
      isLogged: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Enternal server error" });
  }
}