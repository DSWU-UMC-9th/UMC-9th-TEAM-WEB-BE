export function HotSentenceResponseDto(sentences) {
  return sentences.map(s => ({
    id: s.id,
    title: s.book?.title ?? null,
    sentence: s.content
  }));
}

export function BaseSuccessResponse(data) {
  return {
    resultType: "SUCCESS",
    error: null,
    success: { data }
  };
}

export function BaseErrorResponse(message) {
  return {
    resultType: "FAIL",
    error: { message },
    success: null
  };
}

export function PopularKeywordResponseDto(keywords) {
  return keywords.map(k => ({
    id: k.id,
    name: k.name,
    sentenceCount: k.sentenceCount
  }));
}

export function MyLibraryResponseDto(library) {
  return library.map(item => ({
    id: item.id,
    book: {
      id: item.book.id,
      title: item.book.title,
      author: item.book.author,
      imgUrl: item.book.imgUrl
    }
  }));
}