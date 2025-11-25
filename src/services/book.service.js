import { findAllBooks } from "../repositories/book.repository.js";

export const getBooks = async () => {
  const books = await findAllBooks();
  return Array.isArray(books)
    ? books.map((b) => ({
        id: b.id,
        title: b.title,
        author: b.author,
        img_url: b.imgUrl ?? null,
      }))
    : [];
};
