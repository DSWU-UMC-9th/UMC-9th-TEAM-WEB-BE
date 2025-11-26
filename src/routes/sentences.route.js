import express from "express";
import { handleListComments } from "../controllers/sentence.controller.js";

const router = express.Router();

router.get("/:sentenceId/comments", handleListComments);

export default router;
