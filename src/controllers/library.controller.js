import { StatusCodes } from "http-status-codes";
import { createMyBook, listMyLibrary, detailMyBook, deleteMyBook, updateMyBook } from "../services/library.service.js";
import { bodyToCreateUserBook, bodyToUpdateUserBook, userBookDetailToResponse, userBooksToResponse } from "../dtos/userBook.dto.js";

export const handleAddUserBook = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (!userId) throw new Error("userId가 필요합니다.");

    const dto = bodyToCreateUserBook(req.body);

    const created = await createMyBook(userId, dto);
    return res.status(StatusCodes.CREATED).json(userBookDetailToResponse(created));
  } catch (err) {
    next(err);
  }
}

export const handleListUserBooks = async(req, res, next) => {
    try{
        const userId = req.body.userId;
        if (!userId) throw new Error("userId가 필요합니다.");
        const list = await listMyLibrary(userId);
        return res.status(StatusCodes.OK).json(userBooksToResponse(list));
    }catch(err){
        next(err)
    }
}

export const handleDetailUserBook = async (req, res, next) => {
    try{
        const userId = req.body.userId;
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
        const userId = req.body.userId;
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
        const userId = req.body.userId;
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