import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommentInput, ContentBar, TitleBar, WriterBar } from '../../components'
import { Button, FloatingPost, Tag } from '../../components/index'
import { BoardDetailData } from '../../mocks/data'

const BoardDetail = () => {
  const { categoryName, id } = useParams()
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      console.log(comment)
      setComment('')
    }
  }

  const {
    title,
    content,
    up_cnt,
    view_cnt,
    profile_id,
    tags,
    comments,
    data,
    profile_img,
    comment_cnt,
  } = BoardDetailData

  console.log(categoryName, id)

  return (
    <div>
      <FloatingPost count={up_cnt} />
      <TitleBar title={title} />
      <div className='flex items-center justify-between gap-4'>
        <WriterBar
          profile_id={profile_id}
          date={data}
          profile_img={profile_img}
        />
        <Button children='팔로우' />
      </div>

      <div className='flex gap-2'>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className='flex justify-end text-dark-gray'>조회수 {view_cnt}</div>
      <ContentBar mkdStr={content} />
      <div className='my-24'>
        <p className='text-2xl font-semibold border-b-2 border-main-color'>
          {comment_cnt}개의 댓글
        </p>
        <div className='flex flex-col items-end justify-end gap-4 mb-2'>
          <CommentInput onCommentChange={setComment} comment={comment} />
          <Button children='댓글 작성' onClick={handleSubmit} />
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className='mb-1 text-lg border-b-2'>
            <WriterBar
              profile_id={comment.nickname}
              date={comment.date}
              profile_img={comment.profile_img}
            />
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardDetail
