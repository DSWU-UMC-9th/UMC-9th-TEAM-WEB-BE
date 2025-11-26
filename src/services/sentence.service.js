import { findSentenceWithComments } from "../repositories/sentence.repository.js";

export const getCommentsForSentence = async (sentenceId) => {
  const sentence = await findSentenceWithComments(sentenceId);
  if (!sentence) return null;

  const comments = Array.isArray(sentence.comment)
    ? (() => {
        const map = new Map();
        let idx = 1;
        return sentence.comment.map((c) => {
          const uid = c.userId ?? `__anon_${c.id}`;
          if (!map.has(uid)) {
            map.set(uid, `익명${idx}`);
            idx += 1;
          }
          return {
            id: c.id,
            name: map.get(uid),
            content: c.content,
            created_at: c.createdAt ? new Date(c.createdAt).toISOString() : null,
          };
        });
      })()
    : [];

  return {
    sentence: { id: sentence.id, content: sentence.content },
    comments,
  };
};
