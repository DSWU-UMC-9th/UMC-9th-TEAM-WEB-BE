import { prisma } from "../db.config.js"

export const getAllUserBooks= async (userId) => {
    const list = await prisma.userBook.findMany({
        where: {userId: userId},
        include: {
            book: true,
            keywords: {
                include: { keyword: true },
            }
        },
        orderBy: {id: "asc"}
    })
    return list;
}

export const getUserBookById = async (id) =>{
    const userBook = await prisma.userBook.findFirst({
        where: {id:id},
        include: {
            book: true,
            keywords: {
                include: { keyword: true },
            },
        },
    })
    return userBook
}

export const createUserBook = async (userId, bookId, dto) => {
    const { pageCount, readingMinutes, sentence, note, keywordIds = [] } = dto;
    return prisma.userBook.create({
        data:{
            userId,
            bookId,
            userBookImg: dto.imgUrl,
            pageCount,
            readingMinutes,
            note,
            keywords: {
                create: (keywordIds || []).map((kId) => ({
                    keywordId: kId,
                }))
            }
        },
        include: {
            book: true,
            keywords: { include: {keyword: true}},
        }
    })
}

export const updateUserBookBase = async (id, data) => {
  return prisma.userBook.update({
        where: {id: id},    
        data,
  });
};

export const deleteUserBook = async(id) => {
    return prisma.userBook.delete({
        where: {id: id},    
    })
}

export const deleteKeywordsByUserBookId = async (userBookId) => {
  return prisma.userBookKeyword.deleteMany({
        where: { userBookId },
  });
};

export const createKeywordsForUserBook = async (userBookId, keywordIds) => {
  if (!keywordIds || keywordIds.length === 0) return;
  return prisma.userBookKeyword.createMany({
    data: keywordIds.map((kId) => ({
      userBookId,
      keywordId: kId,
    })),
  });
};

// 도서명 + 저자명으로 Book 존재 여부 확인
export const findBookByTitleAndAuthor = async (title, author) => {
  return prisma.book.findFirst({
    where: {
      title,
      author,
    },
  });
};

// Book 새로 생성
export const createBook = async ({ title, author, imgUrl }) => {
  return prisma.book.create({
    data: {
      title,
      author,
      imgUrl: imgUrl ?? null,
    },
  });
};