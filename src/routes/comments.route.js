import express from "express";
import { handleUpdateComment, handleDeleteComment } from "../controllers/sentence.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/:commentId", authMiddleware, handleUpdateComment);
router.delete("/:commentId", authMiddleware, handleDeleteComment);

export default router;
