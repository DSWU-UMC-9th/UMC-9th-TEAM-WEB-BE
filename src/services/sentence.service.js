import { findSentenceWithComments, createComment } from "../repositories/sentence.repository.js";

export const getCommentsForSentence = async (sentenceId) => {
  const sentence = await findSentenceWithComments(sentenceId);
  if (!sentence) return null;

  const comments = Array.isArray(sentence.comment)
    ? sentence.comment.map((c) => ({
        id: c.id,
        userId: c.userId,
        nickname: c.user?.nickname ?? "알 수 없음",
        content: c.content,
        created_at: c.createdAt ? new Date(c.createdAt).toISOString() : null,
      }))
    : [];

  return {
    sentence: { id: sentence.id, content: sentence.content },
    comments,
  };
};

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
