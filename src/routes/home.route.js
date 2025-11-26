import express from "express";
import { getHot, getPopularKeywords } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/hot", getHot);
router.get("/keyword", getPopularKeywords);
//router.get("/library", verifyToken, getMyLibrary);

export default router;