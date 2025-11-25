import { findAllBooks, findBooksByKeyword, findBookWithRelations } from "../repositories/book.repository.js";

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

export const getBookDetail = async (bookId) => {
  const book = await findBookWithRelations(bookId);
  if (!book) return null;

  // collect unique keyword names across all userBooks
  const kwSet = new Set();
  if (Array.isArray(book.userBooks)) {
    for (const ub of book.userBooks) {
      if (!ub || !Array.isArray(ub.keywords)) continue;
      for (const ubk of ub.keywords) {
        if (ubk && ubk.keyword && ubk.keyword.name) kwSet.add(ubk.keyword.name);
      }
    }
  }

  const keywords = Array.from(kwSet);
  const sentences = Array.isArray(book.sentences)
    ? book.sentences.map((s) => ({ id: s.id, content: s.content }))
    : [];

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    img_url: book.imgUrl ?? null,
    keywords,
    sentences,
  };
};
