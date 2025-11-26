import express from "express";
import { handleAddUserBook, handleDeleteUserBook, handleDetailUserBook, handleListUserBooks, handleUpdateUserBook } from "../controllers/library.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.use(authMiddleware);

router.get("", handleListUserBooks)
router.post("", upload, handleAddUserBook)
router.get("/:userBookId", handleDetailUserBook)
router.patch("/:userBookId", handleUpdateUserBook)
router.delete("/:userBookId", handleDeleteUserBook)

export default router;
