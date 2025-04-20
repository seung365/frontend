# DevInit - 개발자 커뮤니티 플랫폼 🚀

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=npm&logoColor=white)

[![Deploy](https://img.shields.io/badge/DevInit-배포_링크-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](http://34.64.72.48/)

</div>

## 👥 팀 소개
DevInit은 열정 넘치는 4명의 개발자가 모여 시작한 프로젝트입니다.

|Frontend|Frontend|Backend|Backend|
|:------:|:------:|:------:|:------:|
|[<img src="https://avatars.githubusercontent.com/u/78842816?v=4" width="100px">](https://github.com/min-s9709)|[<img src="https://avatars.githubusercontent.com/u/74394824?v=4" width="100px">](https://github.com/seung365)|[<img src="https://avatars.githubusercontent.com/u/49359846?v=4" width="100px">](https://github.com/jiwon2030)|[<img src="https://avatars.githubusercontent.com/u/77718648?v=4" width="100px">](https://github.com/moonsunmean)|
|[김민성](https://github.com/min-s9709)|[백승범](https://github.com/seung365)|[민지원](https://github.com/jiwon2030)|[문선민](https://github.com/moonsunmean)|

## 📌 프로젝트 소개

**DevInit**은 개발자들의 새로운 시작을 응원합니다!

개발자 커리어를 시작하는 순간부터 함께하는 커뮤니티를 지향합니다. <br>
DevInit이란 이름에는 개발자(Developer)의 시작(Init)이라는 의미를 담았습니다.

## 🎥 시연 영상
[DevInit 소개영상 보러가기](https://www.youtube.com/watch?v=Q522KXwnJ3I)

## 🎯 주요 기능

### 🏠 홈화면

- 간편한 소셜 로그인
- 프로필 랜덤 슬라이드 조회
- 무한스크롤이 적용된 피드형 게시글

### 📝 게시판

- 카테고리별 게시글 조회 (무한스크롤)
- 태그 기반 필터링 시스템
- 키워드 검색 기능

### ✍️ 게시글 기능

- 마크다운 에디터 지원
- 로컬 이미지 업로드
- 대댓글, 좋아요, 팔로우 기능
- 게시글 태그 및 카테고리 지정

### 👤 프로필

- 개인 프로필 및 이력서 관리
- 작성 게시글 히스토리
- 팔로우 시스템
- GitHub 스타일의 연간 활동 통계
- 프로필 정보 커스터마이징

### 🌐 개발자 허브

- 개발자 프로필 디렉토리
- 다양한 필터링 옵션 (최신순/인기순, 기술 스택, 경력)
- 무한스크롤 적용된 유저 리스트

### 💬 실시간 채팅

- WebSocket과 STOMP 기반 실시간 채팅
- 채팅방 생성/조회/삭제
- 실시간 메시지 처리 시스템

## 💪 주요 구현 기능

### 게시글 작성 페이지
![게시글 작성 페이지](/src/assets/docs_images/image1.svg)
해당 페이지에서는 React Hook Form과 React MD Editor을 이용해 유저에게 제목, 
카테고리, 태그, 본문 내용을 받아 옵니다.

카테고리는 자유게시판, 코딩질문, 스터디 구인, 프로젝트 구인, 경험 공유로 이루어져 있습니다.

태그의 경우 정적인 태그를 제공해 사용자가 
태그를 통해 자신의 게시글을 표현 할 수 있습니다.

본문의 경우 마크다운 형식을 지원하고 있으며 로컬에서 사진 첨부 기능을 추가해 url을 서버로부터 받아와 사용자가 로컬의 사진도 추가할 수 있게 하였습니다.

### 게시글 페이지
![게시글 페이지](/src/assets/docs_images//image2.svg)
해당 페이지에서는 서버로부터 게시글 상세 내용을 받아오게 됩니다. 

이때 사용자는 해당 페이지에서 유저 팔로우, 게시글 좋아요, 해당 게시글 링크복사, 댓글과 같은 기능을 수행할 수 있습니다. 

특히 게시글 좋아요와 댓글의 경우 Tanstack Query를 사용해 invalidateQueries로 
사용자가 좋아요나 댓글을 작성할 경우 
쿼리 무효화를 통해 필요한 순간에 캐싱값을 refetch해주며 서버와 데이터 동기화를 구현하였습니다.

### 허브 페이지
![허브 페이지](/src/assets/docs_images/image3.svg)
해당페이지에서 무한스크롤을 통해 사용자들의 정보를 보여줍니다.

무한 스크롤의 경우 Tanstack Query의useInfinitequery와 intersection을 사용해 구현하였습니다. 

또한 해당 페이지에서는 필터 기능을 통해 
유저는 자신이 검색하고 싶은 분야 또는 경력의 사람들을 필터링해 볼 수 있습니다.  

### 채팅 기능
![채팅 기능](/src/assets/docs_images/image4.svg)
실시간 그룹 채팅을 가능케 합니다.
STOMPJS를 사용하여 구현하였습니다.
기본적인 채팅방 생성, 조회, 삭제가 가능합니다.

나의 채팅방인 경우 삭제가 가능하며 현재는 DB에 저장되지 않는 휘발성 채팅이나 현재 고도화 진행 중 입니다.

Floating Button을 통해 어디서든 채팅이 가능하게 하였습니다.

## 🛠 기술 스택

### Frontend

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=npm&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![ React MD Editor](https://img.shields.io/badge/React_MD_Editor-000000?style=for-the-badge&logo=markdown&logoColor=white)
![stompjs](https://img.shields.io/badge/stompjs-010101?style=for-the-badge&logo=socket.io&logoColor=white)

</div>


### DevOps & Tools

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>



## 📝 커밋 메시지 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 사소한 수정 및 빌드 설치 사항
build: 빌드 관련 수정
```

## 📁 프로젝트 구조

```
src/
├── apis/          # API 통신 관련 코드
├── assets/        # 정적 리소스
├── components/    # 재사용 가능한 컴포넌트
├── constant/      # 상수 정의
├── hooks/         # 커스텀 훅
├── mocks/         # 목업 데이터
├── pages/         # 페이지 컴포넌트
├── routes/        # 라우팅 설정
├── store/         # 상태 관리
├── styles/        # 전역 스타일
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```

---
<div align="center">
  
**DevInit**과 함께 당신의 개발 여정을 시작하세요! 🚀

</div>