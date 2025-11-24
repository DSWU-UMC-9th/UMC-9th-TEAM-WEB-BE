import { prisma } from "../db.config.js";
import { v4 as uuid } from "uuid";

// 회원 생성
export const createUser = async (email, hashedPassword, nickname) => {
    const newUser = await prisma.user.create({
    data: {
        id: uuid(),
        email,
        pass: hashedPassword,
        nickname,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
});

    return newUser;
};

// 이메일로 유저 찾기
export const findUserByEmail = async (email) => {
    return prisma.user.findFirst({
        where: { email },
    });
};
// 닉네임으로 유저 찾기 (중복 체크)
export const findUserByNickname = async (nickname) => {
    return prisma.user.findFirst({
        where: { nickname },
    });
};

