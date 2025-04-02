import express from "express";
import * as postController from "../controllers/postController.js";

const router = express.Router();

router.get("/all", postController.getAllPosts);
router.get("/all/:id", postController.getAllPostsByUserId);
router.post("/create", postController.createPost);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.get("/:id", postController.getPostById);

export default router;