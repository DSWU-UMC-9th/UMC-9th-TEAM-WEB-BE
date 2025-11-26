import { StatusCodes } from "http-status-codes";
import { createMyBook, listMyLibrary, detailMyBook, deleteMyBook, updateMyBook } from "../services/library.service.js";
import { bodyToCreateUserBook, bodyToUpdateUserBook, userBookDetailToResponse, userBooksToResponse } from "../dtos/userBook.dto.js";

export const handleAddUserBook = async (req, res, next) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    if (!userId) throw new Error("userId가 필요합니다.");
    
    //이미지가 저장된 s3 주소
    const imgUrl = req.files && req.files['image'] && req.files['image'][0] 
                        ? req.files['image'][0].location : null;
    console.log(imgUrl)
    const requestJsonString = req.body.data;
    if (!requestJsonString) {
      console.error("요청 본문에 'data' 필드가 누락되었습니다.");
      return res.status(400).send({
        resultType: "ERROR",
        error: { message: "도서 정보 필드('data')가 누락되었습니다." }
      });
    }
    let bookObject;
    try {
      // 1-2. JSON 파싱 시도 및 SyntaxError 처리
      bookObject = JSON.parse(requestJsonString);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.error("JSON 파싱 오류:", e.message);
        return res.status(400).send({
          resultType: "ERROR",
          error: { message: "전달된 도서 정보('data' 필드)가 유효한 JSON 형식이 아닙니다." }
        });
      }
      // 예상치 못한 다른 오류가 발생하면 다음 미들웨어로 전달
      throw e;
    }

    const dto = bodyToCreateUserBook(bookObject, imgUrl);

    const created = await createMyBook(userId, dto);
    return res.status(StatusCodes.CREATED).json(userBookDetailToResponse(created));
  } catch (err) {
    next(err);
  }
}

export const handleListUserBooks = async(req, res, next) => {
    try{
        const userId = req.user.id;
        if (!userId) throw new Error("userId가 필요합니다.");
        const list = await listMyLibrary(userId);
        return res.status(StatusCodes.OK).json(userBooksToResponse(list));
    }catch(err){
        next(err)
    }
}

export const handleDetailUserBook = async (req, res, next) => {
    try{
        const userId = req.user.id;
        if (!userId) throw new Error("userId가 필요합니다.");
        const userBookId = Number(req.params.userBookId);
        if (!userBookId) throw new Error("userBookId가 필요합니다.");

        const detail = await detailMyBook(userId, userBookId);
        return res.status(StatusCodes.OK).json(userBookDetailToResponse(detail));
    }catch(err){
        next(err)
    }
}

export const handleDeleteUserBook = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) throw new Error("userId가 필요합니다.");        
        const userBookId = Number(req.params.userBookId);

        const deleted = await deleteMyBook(userId, userBookId);
        return res.status(StatusCodes.OK).json(deleted);
  } catch (err) {
        next(err);
  }
}

export const handleUpdateUserBook = async (req, res, next) => {
  try {
        const userId = req.user.id;
        if (!userId) throw new Error("userId가 필요합니다.");
        const userBookId = Number(req.params.userBookId);
        const dto = bodyToUpdateUserBook(req.body);

        const updated = await updateMyBook(userId, userBookId, dto);
        return res
        .status(StatusCodes.OK)
        .json(userBookDetailToResponse(updated));
    } catch (err) {
        next(err);
    }
}