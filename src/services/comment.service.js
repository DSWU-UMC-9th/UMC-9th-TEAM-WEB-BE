import { createComment, findCommentById, updateComment, deleteComment } from "../repositories/comment.repository.js";
import { findSentenceWithComments } from "../repositories/sentence.repository.js";

export const createCommentForSentence = async (sentenceId, userId, content) => {
  // 문장이 존재하는지 확인
  const sentence = await findSentenceWithComments(sentenceId);
  if (!sentence) {
    const error = new Error("해당 문장을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  // 댓글 생성
  const comment = await createComment(sentenceId, userId, content);
  if (!comment) {
    const error = new Error("댓글 내용이 필요합니다.");
    error.status = 400;
    throw error;
  }

  return {
    id: comment.id,
    sentenceId: comment.sentenceId,
    userId: comment.userId,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  };
};

export const updateCommentById = async (commentId, userId, content) => {
  // 댓글 존재 여부 확인
  const comment = await findCommentById(commentId);
  if (!comment) {
    const error = new Error("해당 댓글을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  // 작성자 본인 확인
  if (comment.userId !== userId) {
    const error = new Error("댓글 수정 권한이 없습니다.");
    error.status = 403;
    throw error;
  }

  // 댓글 수정
  const updated = await updateComment(commentId, content);
  
  return {
    id: updated.id,
    sentenceId: updated.sentenceId,
    userId: updated.userId,
    content: updated.content,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
};

export const deleteCommentById = async (commentId, userId) => {
  // 댓글 존재 여부 확인
  const comment = await findCommentById(commentId);
  if (!comment) {
    const error = new Error("해당 댓글을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  // 작성자 본인 확인
  if (comment.userId !== userId) {
    const error = new Error("댓글 삭제 권한이 없습니다.");
    error.status = 403;
    throw error;
  }

  // 댓글 삭제
  await deleteComment(commentId);
  
  return {
    message: "댓글이 삭제되었습니다.",
    id: commentId,
  };
};
