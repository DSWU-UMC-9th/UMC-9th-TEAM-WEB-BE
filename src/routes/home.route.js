import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getHot, getPopularKeywords, getMyLibrary } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/hot", getHot);
router.get("/keyword", getPopularKeywords);
router.get("/library", authMiddleware, getMyLibrary);

export default router;