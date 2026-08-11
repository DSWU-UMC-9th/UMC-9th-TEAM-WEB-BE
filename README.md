# 📚 PAGE PARTNER
독서 기록을 저장하고, 공유 기능을 제공하는 UMC 9th 미니 프로젝트 **PAGE PARTNER**의 백엔드 레포지토리입니다.

---

## 👥 팀원 소개

| 김가윤 | 박현지 | 이혜린 | 하늘새미 |
|:---:|:---:|:---:|:---:|
| <img src="https://github.com/JCTA0125.png" width="150" height="150"> | <img src="https://github.com/park-hyunji.png" width="150" height="150"> | <img src="https://github.com/whathehyell.png" width="150" height="150"> | <img src="https://github.com/haneulsaemi.png" width="150" height="150"> |
| [@JCTA0125](https://github.com/JCTA0125) | [@park-hyunji](https://github.com/park-hyunji) | [@whathehyell](https://github.com/whathehyell) | [@haneulsaemi](https://github.com/haneulsaemi) |

---

## 📚 Features
✔ **회원가입**
- 회원가입
- 로그인
- 닉네임 중복 확인

✔ **홈페이지**
- HOT 구절 조회
- 인기 키워드 조회
- 나의 도서 목록 조회

✔ **나의 서재**
- 도서 추가/수정/삭제
- 도서 상세 정보 조회

✔ **토론 광장**
- 도서 목록 조회
- 키워드 별 도서 목록 조회
- 도서 별 상세 정보 조회
- 댓글 조회
- 댓글 작성/수정/삭제

---

## ⚙️ Tech Stack

| 기술 | 설명 |
|------|------|
| Node.js | 서버 런타임 |
| Express.js | REST API 라우팅 및 미들웨어 구성 |
| Prisma ORM | DB ORM / Schema 관리 / Migration / Seed |
| MySQL | 메인 데이터베이스 |
| Git | 체계적인 코드 관리 및 협업 |

### 📦 사용 라이브러리

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| express | 5.1.0 | 라우팅 및 서버 구성 |
| @prisma/client, prisma | 6.19.0 | 타입 안전 ORM & Schema 관리 |
| jsonwebtoken | 9.0.2 | JWT 인증 |
| bcrypt | 6.0.0 | 비밀번호 암호화 |
| dotenv | 17.2.3 | 환경 변수(.env) 관리 |
| morgan | 1.10.1 | 로그 관리 |
| @aws-sdk/client-s3 | 3.939.0 | DB 사진 저장 |


### 🚀 배포 구조
> 본 프로젝트는 AWS 인프라를 기반으로 배포되었습니다.

| 서비스 | 역할 |
|--------|------|
| **AWS EC2** | Node.js Express 서버 배포 |
| **AWS RDS (MySQL)** | Prisma ORM 기반 운영 DB<br>Prisma Migrate로 스키마 및 마이그레이션 관리 |
| **AWS S3** | 책 이미지 및 사용자 업로드 이미지 저장<br>Presigned URL 기반 업로드 방식 지원 |


### 📁 Project Structure
```src
├── controllers
│   └── book.controller.js
│   └── home.controller.js
│   └── library.controller.js
│   └── sentence.controller.js
│   └── user.controller.js
├── services
│   └── book.service.js
│   └── home.service.js
│   └── library.service.js
│   └── sentence.service.js
│   └── user.service.js
├── repositories
│   └── book.repository.js
│   └── home.repository.js
│   └── sentence.repository.js
│   └── user.repository.js
│   └── userBook.repository.js
├── middlewares
│   └── auth.middleware.js
│   └── upload.middleware.js
├── routes
│   └── book.routes.js
│   └── home.routes.js
│   └── library.routes.js
│   └── sentence.routes.js
│   └── user.routes.js
├── dtos
│   └── home.dto.js
│   └── user.dto.js
│   └── userBook.dto.js
├── prisma
│   ├── schema.prisma
├── index.js
└── db.config.js
```

---

## 🧭 Git Conventions

### 📌 Branch 전략

- 메인 브랜치: `main`
- 기능 개발 시 화면 또는 역할 기준으로 브랜치 명명 (영역/기능 형태)
  - 예시: `community/review`, `home/feed`

**작업 흐름**  
1. 기능 이슈 생성 → 번호 발급  
2. `main` → `기능 브랜치` 생성 후 작업  
3. 작업 완료 → `main` 브랜치로 Pull Request 생성

### 📌 작업 템플릿 가이드

작업 유형에 따라 명확하게 커밋 타입을 구분합니다.

| 타입 | 용도 |
|------|------|
| **feat** | 새로운 기능 추가 |
| **fix** | 버그 수정 |
| **refactor** | 코드 리팩토링 (동작 변화 없이 구조 개선) |
| **docs** | 문서 작성 및 수정 (README, 주석 등) |
| **style** | 코드 포맷, 네이밍, 세미콜론 등 스타일 변경 (기능 무관) |
| **test** | 테스트 코드 추가 및 수정 |
| **chore** | 설정, 빌드, 패키지 등 기타 변경 작업 |

---

### ✅ Commit 템플릿

```text
타입: 간단한 설명

- 작업한 내용에 대한 구체적인 설명
- 필요한 경우 여러 줄로 상세하게 작성
```

### 📝 Pull Request 템플릿

```txt
타입: 간단한 설명

## 작업 내용
- 무엇을 변경했는지 간단히 작성

## 참고 사항
- 리뷰 시 유의해야 할 사항

## 관련 이슈
close #이슈번호
```

### 💡 Issue 템플릿

```txt
타입: 이슈 제목

## 이슈 개요
- 어떤 작업인지 간략히 설명해주세요.

## 작업 항목
- [ ] 작업 1
- [ ] 작업 2
- [ ] 작업 3

## 참고 자료
- 관련 문서, 디자인, 링크 등
```
