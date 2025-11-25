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
