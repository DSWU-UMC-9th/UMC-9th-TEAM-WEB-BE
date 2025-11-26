import express from "express";
import { getHot, getPopularKeywords } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/hot", getHot);
router.get("/keyword", getPopularKeywords);

export default router;