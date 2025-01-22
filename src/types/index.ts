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
