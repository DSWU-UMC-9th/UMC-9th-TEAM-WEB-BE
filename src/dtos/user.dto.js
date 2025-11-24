// src/dtos/user.dto.js

// 회원가입 요청 바디를 User 생성용 데이터로 변환
export const bodyToUser = (body) => {
    const birth = body.birth ? new Date(body.birth) : null;
    
    return {
        email: body.email,
        password: body.password,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber || "",
    };
};

// 응답으로 내려줄 때 비밀번호는 제거
export const userToResponse = (user) => {
    if (!user) return null;
    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
    };
};
