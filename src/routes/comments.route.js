import express from "express";
import { handleUpdateComment } from "../controllers/sentence.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/:commentId", authMiddleware, handleUpdateComment);

export default router;
