// id 값은 임시
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
