import express from "express";
import { handleListBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.get("", handleListBooks);

export default router;
