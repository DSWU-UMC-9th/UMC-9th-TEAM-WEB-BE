import { signUp, login, checkNickname } from "../services/user.service.js";

export const handleSignUp = async (req, res, next) => {
    try {
        const { email, password, nickname } = req.body;
        const result = await signUp(email, password, nickname);
        
        return res.json({
            resultType: "SUCCESS",
            error: null,
            success: result,
        });
    } catch (err) {
        next(err);
    }
};

export const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        
        return res.json({
            resultType: "SUCCESS",
            error: null,
            success: result,
        });
    } catch (err) {
        next(err);
    }
};
export const handleCheckNickname = async (req, res) => {
    const { nickname } = req.body;

    const result = await checkNickname(nickname);

    res.json({
        resultType: "SUCCESS",
        error: null,
        success: { data: result },
    });
};

