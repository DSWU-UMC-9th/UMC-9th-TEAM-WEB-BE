import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Authorization 헤더 존재 여부 확인
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message: "인증 토큰이 필요합니다."})
    }

  // "Bearer xxx.yyy.zzz" 에서 토큰 부분만 추출
  const token = authHeader.split(" ")[1];

  try {
    // 2) 토큰 검증 (sign 할 때 썼던 secret과 동일해야 함)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret"
    );

    // 3) 이후 라우터/서비스에서 쓸 수 있도록 req.user에 심어주기
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    // 만료 / 위조 / 포맷 오류 등
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "토큰이 만료되었습니다." });
    }
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
    
}