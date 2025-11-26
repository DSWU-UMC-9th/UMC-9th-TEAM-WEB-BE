import express from "express";
import {
    handleSignUp,
    handleLogin,
    handleCheckNickname,   
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/nickname/check", handleCheckNickname);

export default router;
