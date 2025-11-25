import express from "express";
import { handleListBooks, handleGetBookDetail } from "../controllers/book.controller.js";

const router = express.Router();

router.get("", handleListBooks);
router.get("/:bookId", handleGetBookDetail);

export default router;
