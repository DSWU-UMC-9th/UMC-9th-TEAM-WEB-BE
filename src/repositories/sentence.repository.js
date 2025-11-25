import { prisma } from "../db.config.js";

export const createSentence = async (bookId, userId, content) => {
  if (!content) return null;
  return prisma.sentence.create({
    data: {
      bookId,
      userId,
      content,
    },
  });
};
