import { getAllUserBooks, getUserBookById, updateUserBookBase, createUserBook, deleteUserBook, createBook, findBookByTitleAndAuthor, deleteKeywordsByUserBookId, createKeywordsForUserBook } from "../repositories/userBook.repository.js";

export const listMyLibrary = async (userId) => {
    const list = await getAllUserBooks(userId);
    return list;
}

export const detailMyBook = async (userId, userBookId) => {
    const book = await getUserBookById(userBookId);
    if(!book){
        const error = new Error("나의 서재에 해당 도서가 없습니다.");
        error.status = 404;
        throw error;
    }
    return book;
}

export const createMyBook = async (userId, dto) => {
    const title = dto.title;
    const author = dto.author;
    const imgUrl = dto.imgUrl;
    if( !title || !author){
        const error = new Error("title과 author는 필수입니다.");
        error.status = 400;
        throw error;
    }
    // 같은 책 있는지 확인
    let book = await findBookByTitleAndAuthor(title, author);
    
    if(!book){
        book = await createBook({title, author, imgUrl});
    }
    const created = await createUserBook(userId, book.id, dto);

    return created;
}

export const updateMyBook = async (userId, userBookId, dto) => {
    const existing = await getUserBookById(userBookId);
    if(!existing){
        const error = new Error("나의 서재에 해당 도서가 없습니다.");
        error.status = 404;
        throw error;
    }
    // 기본 필드 업데이트 데이터 구성
    const baseData = {};
    if (dto.pageCount !== undefined) baseData.pageCount = dto.pageCount;
    if (dto.readingMinutes !== undefined)
        baseData.readingMinutes = dto.readingMinutes;
    if (dto.sentence !== undefined) baseData.sentence = dto.sentence;
    if (dto.note !== undefined) baseData.note = dto.note;

    // 1) 기본 정보 업데이트
    await updateUserBookBase(userBookId, baseData);

    // 2) 키워드 재설정 (keywordIds가 넘어온 경우에만)
    if (dto.keywordIds !== undefined) {
        await deleteKeywordsByUserBookId(userBookId);
        await createKeywordsForUserBook(userBookId, dto.keywordIds);
    }

    // 3) 최종 결과 다시 조회
    const result = await getUserBookById(userBookId, userId);
    return result;
}

export const deleteMyBook = async (userId, userBookId) => {
    const existing = await getUserBookById(userBookId);
    if (!existing) {
        const error = new Error("나의 서재에 해당 도서가 없습니다.");
        error.status = 404;
        throw error;
    }

    await deleteKeywordsByUserBookId(userBookId);
    const deleted = await deleteUserBook(userBookId);
    return deleted;
}