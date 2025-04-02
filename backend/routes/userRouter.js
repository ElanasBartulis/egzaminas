import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.register);
router.get("/logout", userController.logout);
router.post("/login", userController.login);
router.get("/session", userController.getSessionData);

export default router;