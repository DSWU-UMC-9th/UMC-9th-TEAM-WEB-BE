import { getCommentsForSentence } from "../services/sentence.service.js";

export const handleListComments = async (req, res, next) => {
  try {
    const sentenceId = Number(req.params.sentenceId);
    if (!sentenceId) {
      const error = new Error("sentenceId가 필요합니다.");
      error.status = 400;
      throw error;
    }

    const data = await getCommentsForSentence(sentenceId);
    if (!data) {
      const error = new Error("해당 문장을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: { data },
    });
  } catch (err) {
    next(err);
  }
};
