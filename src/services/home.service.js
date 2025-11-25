import { HomeRepository, getTopKeywords } from "../repositories/home.repository.js";

export const HomeService = {
  async getHotSentences() {
    const hotContents = await HomeRepository.findHotContents();
    if (hotContents.length === 0) return [];

    const contents = hotContents.map(c => c.content);

    const sentences = await HomeRepository.findLatestSentencesByContents(contents);

    const map = new Map();
    for (const s of sentences) {
      if (!map.has(s.content)) map.set(s.content, s);
    }

    return [...map.values()];
  }
};

export const getPopularKeywordsService = async () => {
  const keywords = await getTopKeywords();
  return keywords.map(k => ({
    id: k.keywordId,
    name: k.keywordName
  }));
};