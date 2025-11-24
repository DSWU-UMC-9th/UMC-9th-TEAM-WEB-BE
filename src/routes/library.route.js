import express from "express";
import { handleAddUserBook, handleDeleteUserBook, handleDetailUserBook, handleListUserBooks, handleUpdateUserBook } from "../controllers/library.controller.js";

const router = express.Router();

router.get("", handleListUserBooks)
router.post("", handleAddUserBook)
router.get("/:userBookId", handleDetailUserBook)
router.patch("/:userBookId", handleUpdateUserBook)
router.delete("/:userBookId", handleDeleteUserBook)

export default router;
