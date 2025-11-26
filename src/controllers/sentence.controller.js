import { getCommentsForSentence, createCommentForSentence, updateCommentById } from "../services/sentence.service.js";

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

export const handleCreateComment = async (req, res, next) => {
  try {
    const sentenceId = Number(req.params.sentenceId);
    const userId = req.user?.id;
    const { content } = req.body;

    // 입력값 검증
    if (!sentenceId) {
      const error = new Error("sentenceId가 필요합니다.");
      error.status = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error("로그인이 필요합니다.");
      error.status = 401;
      throw error;
    }

    if (!content || !content.trim()) {
      const error = new Error("댓글 내용이 필요합니다.");
      error.status = 400;
      throw error;
    }

    // 댓글 생성
    const data = await createCommentForSentence(sentenceId, userId, content);

    return res.status(201).json({
      resultType: "SUCCESS",
      error: null,
      success: { data },
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdateComment = async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);
    const userId = req.user?.id;
    const { content } = req.body;

    // 입력값 검증
    if (!commentId) {
      const error = new Error("commentId가 필요합니다.");
      error.status = 400;
      throw error;
    }

    if (!userId) {
      const error = new Error("로그인이 필요합니다.");
      error.status = 401;
      throw error;
    }

    if (!content || !content.trim()) {
      const error = new Error("댓글 내용이 필요합니다.");
      error.status = 400;
      throw error;
    }

    // 댓글 수정
    const data = await updateCommentById(commentId, userId, content);

    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: { data },
    });
  } catch (err) {
    next(err);
  }
};
