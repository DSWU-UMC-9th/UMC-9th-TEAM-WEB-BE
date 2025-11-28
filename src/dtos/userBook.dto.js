const toKeywordIds = (keywords) => {
  if (!Array.isArray(keywords)) return [];
  return keywords.map((id) => Number(id));
};

// create용
export const bodyToCreateUserBook = (data, imgUrl) => {
  return {
    title: data.title?.trim(),
    author: data.author?.trim(),
    imgUrl: imgUrl ?? null,
    pageCount: data.pageCount ? Number(data.pageCount) : null,
    readingMinutes: data.readingMinutes ? Number(data.readingMinutes) : null,
    note: data.note ?? null,
    keywordIds: Array.isArray(data.keywords)
      ? data.keywords.map((id) => Number(id))
      : [], // 없으면 빈 배열
    sentence: data.sentence ?? null,
  };
};

//update용
export const bodyToUpdateUserBook = (data) => {
    return {
         pageCount: data.pageCount !== undefined ? Number(data.pageCount) : undefined,
    readingMinutes:
      data.readingMinutes !== undefined
        ? Number(data.readingMinutes)
        : undefined,
    note: data.note !== undefined ? data.note : undefined,
    sentence: data.sentence !== undefined ? data.sentence : undefined,
    keywordIds:
      data.keywords !== undefined ? toKeywordIds(data.keywords) : undefined,
    }
}

// 상세 응답 DTO
export const userBookDetailToResponse = (userBook, sentence) => {
  if (!userBook) return null;

  return {
    id: userBook.id,
    book: userBook.book
      ? {
          id: userBook.book.id,
          title: userBook.book.title,
          author: userBook.book.author,
          imgUrl: userBook.book.imgUrl ?? null,
        }
      : null,
    userBookImg: userBook.userBookImg,
    pageCount: userBook.pageCount,
    readingMinutes: userBook.readingMinutes,
    sentence: sentence,
    note: userBook.note,
    keywords: Array.isArray(userBook.keywords)
      ? userBook.keywords.map((ubk) => ({
          id: ubk.keyword.id,
          name: ubk.keyword.name,
        }))
      : [],
  };
};

export const userBookListItemToResponse = (userBook) => {
  if (!userBook) return null;

  return {
    id: userBook.id,
    book: userBook.book
      ? {
          id: userBook.book.id,
          title: userBook.book.title,
          author: userBook.book.author,
          imgUrl: userBook.book.imgUrl ?? null,
        }
      : null,
  };
};


// 👉 리스트 응답 DTO: 배열용 헬퍼
export const userBooksToResponse = (userBooks) => {
  return Array.isArray(userBooks) ? userBooks.map(userBookListItemToResponse) : [];
};