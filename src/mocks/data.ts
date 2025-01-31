import { tagType } from '../types'

export const tagName: tagType[] = [
  {
    tagId: 1,
    tagName: '프론트엔드',
  },
  {
    tagId: 2,
    tagName: '백엔드',
  },
  {
    tagId: 3,
    tagName: 'Spring',
  },
  {
    tagId: 4,
    tagName: 'React',
  },
  {
    tagId: 5,
    tagName: 'JS',
  },
  {
    tagId: 6,
    tagName: 'TS',
  },
  {
    tagId: 7,
    tagName: 'Java',
  },
  {
    tagId: 8,
    tagName: 'Python',
  },
  {
    tagId: 9,
    tagName: 'C++',
  },
  {
    tagId: 10,
    tagName: 'Web',
  },
  {
    tagId: 11,
    tagName: 'AWS',
  },
  {
    tagId: 12,
    tagName: '부트캠프',
  },
  {
    tagId: 13,
    tagName: '인턴',
  },
  {
    tagId: 14,
    tagName: '코딩테스트',
  },
  {
    tagId: 15,
    tagName: '정규직',
  },
]

export interface Option {
  value: number
  label: string
}

export const categories: Option[] = [
  { value: 1, label: '자유게시판' },
  { value: 2, label: '코딩질문' },
  { value: 3, label: '스터디 구인' },
  { value: 4, label: '프로젝트 구인' },
  { value: 5, label: '경험 공유' },
]

export const BoardDetailData = {
  title: '제목입니다',
  content: `## 안녕하세요

  **hi**
    
  처음 뵙겠습니다
  
  <img src="https://avatars.githubusercontent.com/u/74394824?v=4"/>`,

  comments: [
    {
      id: 1,
      profile_img: 'https://avatars.githubusercontent.com/u/74394824?v=4',
      nickname: '김코딩',
      content: '좋은 글 감사합니다',
      date: '2021-09-23',
    },
    {
      id: 2,
      profile_img: 'https://avatars.githubusercontent.com/u/74394824?v=4',
      nickname: '김코딩',
      content: '좋은 글 감사합니다',
      date: '2021-09-23',
    },
  ],
  profile_img: 'https://avatars.githubusercontent.com/u/74394824?v=4',
  up_cnt: 10,
  view_cnt: 100,
  data: '2021-09-23',
  profile_id: '코딩좋아',
  category: '자유게시판',
  comment_cnt: 2,
  tags: ['태그1', '태그2'],
}
