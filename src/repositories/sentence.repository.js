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

export const findSentenceWithComments = async (sentenceId) => {
  return prisma.sentence.findUnique({
    where: { id: Number(sentenceId) },
    select: {
      id: true,
      content: true,
      comment: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          userId: true,
          user: { select: { nickname: true } },
        },
        orderBy: { id: 'asc' },
      },
    },
  });
};

export const createComment = async (sentenceId, userId, content) => {
  if (!content || !content.trim()) return null;
  return prisma.comment.create({
    data: {
      sentenceId: Number(sentenceId),
      userId,
      content: content.trim(),
    },
  });
};
