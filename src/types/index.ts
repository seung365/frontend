export interface tagType {
  tagId: number
  tagName: string
}

export interface FormValues {
  title: string
  content: string
  categoryId: number
  tags: tagType[]
}

export interface Comment {
  id: number
  content: string
  memberId: string
  nickName: string
  profileImage: string
  createdAt: string
  commentCnt: number
  parentCommentId: number
}

export interface BoardResponse {
  id: number
  title: string
  content: string
  upCnt: number
  commentCnt: number
  viewCnt: number
  memberId: string
  nickName: string
  profileImage: string
  categoryId: number
  categoryName: string
  comment: Comment[]
  tag: tagType[]
  createdAt: string
  updatedAt: string
}

export type BoardCardType = {
  categoryId: number
  categoryName: string
  commentCnt: number
  content: string
  createdAt: string
  id: number
  memberId: string
  nickName: string
  profileImage: string
  tag: { tagId: number; tagName: string }[]
  thumbnail?: string | null
  title: string
  upCnt: number
  updatedAt: string
  viewCnt: number
}

type Pageable = {
  pageNumber: number
  pageSize: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export type BoardListResponse = {
  content: BoardCardType[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: Pageable
  size: number
  sort: Sort
  totalElements: number
  totalPages: number
}

export type ProfileCardType = {
  id: string
  nickname: string
  profileImage: string
  about: string
}

export type ProfileRandomResponse = ProfileCardType[]
