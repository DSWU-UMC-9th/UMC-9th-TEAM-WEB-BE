import { prisma } from "../db.config.js";

export const findAllBooks = async () => {
  return await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      imgUrl: true,
    },
  });
};

export const findBooksByKeyword = async (keywordName) => {
  if (!keywordName) return [];
  return await prisma.book.findMany({
    where: {
      userBooks: {
        some: {
          keywords: {
            some: {
              keyword: {
                name: keywordName,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      imgUrl: true,
    },
    distinct: ["id"],
  });
};

export const findBookWithRelations = async (bookId) => {
  return prisma.book.findUnique({
    where: { id: Number(bookId) },
    include: {
      sentence: {
        select: { id: true, content: true },
        orderBy: { id: 'asc' },
      },
      userBooks: {
        select: {
          keywords: {
            select: { keyword: { select: { id: true, name: true } } },
          },
        },
      },
    },
  });
};
