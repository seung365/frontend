export const BOARD_CATEGORY_TABS = [
  { path: '/board', categoryName: '전체', id: 351231 },
  { path: '/board/community', categoryName: '자유게시판', id: 23623523 },
  { path: '/board/programming', categoryName: '코딩 질문', id: 352342 },
  { path: '/board/study', categoryName: '스터디', id: 324235 },
  { path: '/board/project', categoryName: '프로젝트', id: 53243252 },
  { path: '/board/experience', categoryName: '경험 공유', id: 2432522 },
] as const

export const BOARD_BANNER_CONTENTS = [
  {
    path: '/board',
    title: '커뮤니티',
    description:
      '🚀 여기는 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을 시작하세요!',
  },
  {
    path: '/board/community',
    title: '자유게시판',
    description: '💬 일상과 생각을 자유롭게 나누는 열린 공간입니다.',
  },
  {
    path: '/board/programming',
    title: '코딩 질문',
    description: '💡 막힌 코드를 풀 실마리를 여기서 찾아보세요!',
  },
  {
    path: '/board/study',
    title: '스터디',
    description: '📚 함께 배우고 성장하는 개발 학습의 시작점입니다.',
  },
  {
    path: '/board/project',
    title: '프로젝트',
    description: '🛠️ 창의적인 아이디어를 현실로 만들어가는 공간입니다.',
  },
  {
    path: '/board/experience',
    title: '경험 공유',
    description: '✨ 개발 여정을 나누고 교훈을 공유하는 소통의 장입니다.',
  },
] as const

export const TAGS_NAME = [
  '프론트엔드',
  '백엔드',
  'Spring',
  'React',
  'JS',
  'TS',
  'Java',
  'Python',
  'C++',
  'Web',
  'AWS',
  '부트캠프',
  '인턴',
  '코딩테스트',
  '정규직',
] as const

export const PROFILE_MENU_TABS = [
  { tab: '프로필', query: '' },
  { tab: '작성 게시물', query: '?tab=board' },
  { tab: '이력서', query: '?tab=resume' },
] as const

export const SKILL_LIST = [
  'Python',
  'JavaScript',
  'Java',
  'HTML/CSS',
  'React',
  'AWS',
  'Spring',
  'SQL',
  'C',
] as const

export const CAREER_TERM = [
  '신입',
  '1~3년차',
  '4~6년차',
  '7~9년차',
  '10년차 이상',
] as const

export const contentTemplates: Record<number, string> = {
  '1': `<!--자유롭게 글을 작성해주세요-->`,

  '2': `### 문제 상황
<!-- 어떤 문제가 발생했는지 설명해주세요 -->

### 시도한 방법
<!-- 문제 해결을 위해 시도해본 방법을 설명해주세요 -->

### 개발 환경
- OS: 
- 언어/프레임워크: 
- 기타 관련 정보:

### 에러 메시지
\`\`\`
여기에 에러 메시지를 붙여넣어주세요
\`\`\`
`,
  '3': `### 스터디 정보
- 주제: 
- 예상 인원: 
- 시작 예정일: 
- 예상 기간: 
- 진행 방식: (온라인/오프라인)
- 모임 주기: 

### 스터디 목표
<!-- 어떤 것을 학습하고 성취하고 싶은지 설명해주세요 -->

### 이런 분을 찾습니다
<!-- 함께하고 싶은 스터디원의 조건이나 성향을 설명해주세요 -->
`,
  '4': `### 프로젝트 소개
<!-- 프로젝트에 대한 간단한 소개를 해주세요 -->

### 모집 인원
<!-- 필요한 포지션과 인원을 적어주세요 -->
- 

### 기술 스택
<!-- 사용할 기술 스택을 나열해주세요 -->
- 

### 예상 일정
- 시작 예정일: 
- 예상 기간: 

### 진행 방식
- 미팅 방식: (온라인/오프라인)
- 미팅 주기: 

### 지원 자격
<!-- 필요한 경력이나 조건을 설명해주세요 -->
`,
  '5': `### 공유하고 싶은 경험
<!-- 어떤 경험을 공유하고 싶으신가요? -->

### 배운 점
<!-- 이 경험을 통해 배운 점은 무엇인가요? -->

### 참고 자료
<!-- 관련된 참고 자료가 있다면 공유해주세요 -->
`,
}
