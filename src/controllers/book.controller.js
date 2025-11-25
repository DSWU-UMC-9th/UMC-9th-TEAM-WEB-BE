import { getBooks, getBookDetail } from "../services/book.service.js";

export const handleListBooks = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const books = await getBooks(keyword);
    const responseData = keyword
      ? { keyword, books }
      : { books };

    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: { data: responseData },
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetBookDetail = async (req, res, next) => {
  try {
    const bookId = Number(req.params.bookId);
    if (!bookId) {
      const error = new Error("bookId가 필요합니다.");
      error.status = 400;
      throw error;
    }

    const detail = await getBookDetail(bookId);
    if (!detail) {
      const error = new Error("해당 도서를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: { data: detail },
    });
  } catch (err) {
    next(err);
  }
};
