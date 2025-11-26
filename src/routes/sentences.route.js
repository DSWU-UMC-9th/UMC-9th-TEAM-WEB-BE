import express from "express";
import { handleListComments, handleCreateComment } from "../controllers/sentence.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:sentenceId/comments", handleListComments);
router.post("/:sentenceId/comments", authMiddleware, handleCreateComment);

export default router;
