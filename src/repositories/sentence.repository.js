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

export const findSentenceByUserIdAndBookId = async (userId, bookId) => {
  return prisma.sentence.findFirst({
    where: {
      userId,
      bookId
    },
    select:{
      id: true,
      content: true,
    }
  })
}

export const updateSentenceById = async (id, newContent) => {
  return prisma.sentence.update({
      where: {
        id,
      },
      data: {
        content: newContent, // content 필드에 새로운 값을 설정
      },
    });
}