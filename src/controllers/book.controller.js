import { getBooks } from "../services/book.service.js";

export const handleListBooks = async (req, res, next) => {
  try {
    const books = await getBooks();
    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: {
        data: {
          books,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
