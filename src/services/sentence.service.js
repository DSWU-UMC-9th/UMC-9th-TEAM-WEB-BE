import { findSentenceWithComments } from "../repositories/sentence.repository.js";

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
