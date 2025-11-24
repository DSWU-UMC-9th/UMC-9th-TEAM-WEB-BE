const toKeywordIds = (keywords) => {
  if (!Array.isArray(keywords)) return [];
  return keywords.map((id) => Number(id));
};

// create용
export const bodyToCreateUserBook = (data) => {
  return {
    title: data.title?.trim(),
    author: data.author?.trim(),
    imgUrl: data.imgUrl ?? null,
    pageCount: data.pageCount ? Number(data.pageCount) : null,
    readingMinutes: data.readingMinutes ? Number(data.readingMinutes) : null,
    sentence: data.sentence ?? null,
    note: data.note ?? null,
    keywordIds: Array.isArray(data.keywords)
      ? data.keywords.map((id) => Number(id))
      : [], // 없으면 빈 배열
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
    sentence: data.sentence !== undefined ? data.sentence : undefined,
    note: data.note !== undefined ? data.note : undefined,
    keywordIds:
      data.keywords !== undefined ? toKeywordIds(data.keywords) : undefined,
    }
}

// 상세 응답 DTO
export const userBookDetailToResponse = (userBook) => {
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
    pageCount: userBook.pageCount,
    readingMinutes: userBook.readingMinutes,
    sentence: userBook.sentence,
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