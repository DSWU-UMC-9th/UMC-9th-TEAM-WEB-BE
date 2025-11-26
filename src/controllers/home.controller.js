import { HomeService, getPopularKeywordsService } from "../services/home.service.js";
import { HotSentenceResponseDto, PopularKeywordResponseDto, BaseSuccessResponse, BaseErrorResponse } from "../dtos/home.dto.js";

export async function getHot(req, res) {
  try {
    const sentences = await HomeService.getHotSentences();
    const dto = HotSentenceResponseDto(sentences);

    return res.json(BaseSuccessResponse(dto));
  } catch (err) {
    console.error("GET /api/v1/home/hot error:", err);
    return res.status(500).json(BaseErrorResponse("서버 오류가 발생했습니다."));
  }
}

export async function getPopularKeywords(req, res) {
  try {
    const keywords = await getPopularKeywordsService();
    const dto = PopularKeywordResponseDto(keywords);

    return res.json(BaseSuccessResponse(dto));
  } catch (err) {
    console.error("GET /api/v1/home/keyword error:", err);
    return res.status(500).json(BaseErrorResponse("인기 키워드 조회 실패"));
  }
}
export async function getMyLibrary(req, res) {
  try {
    const userId = req.user.id;

    const data = await HomeService.getMyLibraryService(userId);
    const dto = MyLibraryResponseDto(data);

    return res.json(BaseSuccessResponse(dto));
  } catch (err) {
    console.error("GET /api/v1/library error:", err);
    return res.status(500).json(BaseErrorResponse("나의 도서 목록 조회 실패"));
  }
}