import { prisma } from "../db.config.js";

export const HomeRepository = {
  async findHotContents() {
    const rows = await prisma.sentence.findMany({
      select: { content: true }
    });

    const countMap = rows.reduce((acc, row) => {
      acc[row.content] = (acc[row.content] || 0) + 1;
      return acc;
    }, {});

    const hotContents = Object.entries(countMap)
      .filter(([_, count]) => count >= 5)
      .map(([content]) => content);

    return hotContents;
  },

  async findLatestSentencesByContents(contents) {
    return prisma.sentence.findMany({
      where: { content: { in: contents } },
      include: {
        book: { select: { title: true } }
      },
      orderBy: { id: "desc" }
    });
  }
};

export const getTopKeywords = async () => {
  const result = await prisma.$queryRaw`
    SELECT
      k.id AS keywordId,
      k.name AS keywordName,
      COUNT(s.id) AS sentenceCount
    FROM keyword k
    JOIN user_book_keyword ubk ON ubk.keyword_id = k.id
    JOIN user_book ub ON ub.id = ubk.user_book_id
    JOIN sentence s ON s.user_id = ub.user_id AND s.book_id = ub.book_id
    GROUP BY k.id
    ORDER BY sentenceCount DESC
    LIMIT 5;
  `;
  return result;
};