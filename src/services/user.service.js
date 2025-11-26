// src/services/user.service.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    createUser,
    findUserByEmail,
    findUserByNickname,
} from "../repositories/user.repository.js";

const SALT = 10;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * 회원가입
 * - 이메일 중복 체크
 * - 닉네임 중복 체크
 * - 비밀번호 해싱
 * - DB 저장
 */
export const signUp = async (email, password, nickname) => {

    if (!isValidEmail(email)) {
        throw new Error("유효하지 않은 이메일 형식입니다.");
    }
  // 1) 이메일 중복 체크
    const existsEmail = await findUserByEmail(email);
    if (existsEmail) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

  // 2) 닉네임 중복 체크
    const existsNickname = await findUserByNickname(nickname);
    if (existsNickname) {
        throw new Error("이미 존재하는 닉네임입니다.");
    }

  // 3) 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, SALT);

  // 4) 사용자 DB 저장
    const newUser = await createUser(email, hashedPassword, nickname);

  // 5) 클라이언트 응답으로 비밀번호는 제외하고 반환
    return {
        id: newUser.id,
        email: newUser.email,
        nickname: newUser.nickname,
    };
};

/**
 * 로그인
 * - 이메일 존재 여부 확인
 * - 비밀번호 비교
 * - JWT 토큰 발급
 */
export const login = async (email, password) => {
  // 1) 이메일 존재 체크
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("존재하지 않는 이메일입니다.");
    }

  // 2) 비밀번호 검증 (DB 컬럼: pass)
    const isMatch = await bcrypt.compare(password, user.pass);
    if (!isMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
    }

  // 3) JWT 토큰 생성
    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
        },
        process.env.JWT_SECRET || "dev_secret",
        { expiresIn: "7d" }
    );

  // 4) 로그인 성공 응답
    return {
        token,
        user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        },
    };
};
export const checkNickname = async (nickname) => {
    if (!nickname || nickname.trim() === "") {
        throw new Error("닉네임이 입력되지 않았습니다.");
    }

    const existsNickname = await findUserByNickname(nickname);

    if (existsNickname) {
        return {
            isAvailable: false,
            message: "이미 사용 중인 닉네임입니다."
        };
    }

    return {
        isAvailable: true,
        message: "사용 가능한 닉네임입니다."
    };
};

