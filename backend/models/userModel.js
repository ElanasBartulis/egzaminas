import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const userModel = sequelize.define("user", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  hashedPassword: { type: DataTypes.STRING, allowNull: false },
  salt: { type: DataTypes.STRING, allowNull: false },
  admin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default userModel;