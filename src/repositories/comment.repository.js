import { prisma } from "../db.config.js";

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

export const findCommentById = async (commentId) => {
  return prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });
};

export const updateComment = async (commentId, content) => {
  return prisma.comment.update({
    where: { id: Number(commentId) },
    data: {
      content: content.trim(),
    },
  });
};

export const deleteComment = async (commentId) => {
  return prisma.comment.delete({
    where: { id: Number(commentId) },
  });
};
