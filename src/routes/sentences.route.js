import express from "express";
import { handleListComments } from "../controllers/sentence.controller.js";
import { handleCreateComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:sentenceId/comments", handleListComments);
router.post("/:sentenceId/comments", authMiddleware, handleCreateComment);

export default router;
