import { findAllBooks, findBooksByKeyword } from "../repositories/book.repository.js";

export const getBooks = async (keyword) => {
  const books = keyword ? await findBooksByKeyword(keyword) : await findAllBooks();
  return Array.isArray(books)
    ? books.map((b) => ({
        id: b.id,
        title: b.title,
        author: b.author,
        img_url: b.imgUrl ?? null,
      }))
    : [];
};
