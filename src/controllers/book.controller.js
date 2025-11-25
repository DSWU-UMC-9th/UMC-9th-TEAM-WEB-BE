import { getBooks } from "../services/book.service.js";

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
