import { getAllUserBooks, getUserBookById, updateUserBookBase, createUserBook, deleteUserBook, createBook, findBookByTitleAndAuthor, deleteKeywordsByUserBookId, createKeywordsForUserBook } from "../repositories/userBook.repository.js";
import { createSentence, findSentenceByUserIdAndBookId, updateSentenceById } from "../repositories/sentence.repository.js";
import { userBookDetailToResponse } from "../dtos/userBook.dto.js";

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

    const sentence = await findSentenceByUserIdAndBookId(userId, book.bookId);
    
    return userBookDetailToResponse(book, sentence.content);
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

    // 만약 사용자가 문장(인상 깊은 문장)을 입력했다면 sentence 테이블에도 추가
    if (dto.sentence) {
        try {
            await createSentence(book.id, userId, dto.sentence);
        } catch (err) {
            // sentence 생성 실패는 전체 흐름을 막지 않도록 로그 후 무시
            console.error("Failed to create sentence record:", err);
        }
    }

    const sentence = await findSentenceByUserIdAndBookId(userId, book.id);
   
    return userBookDetailToResponse(created, sentence.content);
}

export const updateMyBook = async (userId, userBookId, dto) => {
    const existing = await getUserBookById(userBookId);
    if(!existing){
        const error = new Error("나의 서재에 해당 도서가 없습니다.");
        error.status = 404;
        throw error;
    }
    
    const newSentence = dto.sentence;
    if(newSentence  !== undefined ){
        const sentence = await findSentenceByUserIdAndBookId(userId, existing.bookId);
        const temp = updateSentenceById(sentence.id, newSentence);
    }

    // 기본 필드 업데이트 데이터 구성
    const baseData = {};
    if (dto.pageCount !== undefined) baseData.pageCount = dto.pageCount;
    if (dto.readingMinutes !== undefined)
        baseData.readingMinutes = dto.readingMinutes;
    if (dto.note !== undefined) baseData.note = dto.note;

    // 1) 기본 정보 업데이트
    await updateUserBookBase(userBookId, baseData);

    // 2) 키워드 재설정 (keywordIds가 넘어온 경우에만)
    if (dto.keywordIds !== undefined) {
        await deleteKeywordsByUserBookId(userBookId);
        await createKeywordsForUserBook(userBookId, dto.keywordIds);
    }

    // 3) 최종 결과 다시 조회
    const result = await getUserBookById(userBookId);
    const sentence = await findSentenceByUserIdAndBookId(userId, existing.bookId);
    const sentenceContent = sentence ? sentence.content : null;

    return userBookDetailToResponse(result, sentenceContent);
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