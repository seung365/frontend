import { Suspense, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate, useParams } from 'react-router-dom'
import useGetBoardDetail from '../../apis/board/useGetBoardDetail.ts'

import useDeleteBoard from '../../apis/board/useDeleteBoard.ts'
import usePostRecommendation from '../../apis/board/usePostRecommendation.ts'
import queryClient from '../../apis/queryClient'
import {
  Button,
  CommentBar,
  CommentInput,
  ContentBar,
  FloatingPost,
  Loader,
  Tag,
  TitleBar,
  WriterBar,
} from '../../components/index'

const BoardDetailContent = ({ id }: { id: string }) => {
  if (!id) {
    throw new Error('Invalid board ID')
  }
  const navigate = useNavigate()
  const [comment, setComment] = useState<string>('')
  const postRecommendation = usePostRecommendation()
  const memberId = localStorage.getItem('memberId')

  const { data } = useGetBoardDetail(id)
  const { mutate, status } = useDeleteBoard()
  const date = new Date(data.createdAt)
  const createdDate = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`
  const commentDate = new Date(data.comment[0]?.createdAt)
  const commentCreatedDate = `${commentDate.getFullYear()}년 ${
    commentDate.getMonth() + 1
  }월 ${commentDate.getDate()}일`

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (comment.trim()) {
        console.log(comment)
        setComment('')
      }
    },
    [comment],
  )

  const handleClickRecommend = async () => {
    try {
      await postRecommendation(data.id)
      console.log('쿼리 무효화 시도')

      console.log('무효화 전 count:', data.upCnt)
      await queryClient.invalidateQueries({ queryKey: ['board', id] })
      console.log('무효화 후 count:', data.upCnt)
    } catch (error) {
      console.error('추천 중 에러:', error)
    }
  }

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader />
        <span className='ml-3 text-lg text-gray-700'>Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <FloatingPost count={data.upCnt} onheartClick={handleClickRecommend} />
      <TitleBar title={data.title} />
      <div className='flex items-center justify-between gap-4'>
        <WriterBar
          profile_id={data.nickName}
          date={createdDate}
          profile_img={data.profileImage}
        />
        {data.memberId === memberId ? (
          <div className='flex gap-4'>
            <button
              children='수정'
              onClick={() => navigate(`/board/write/${data.id}`)}
            />
            <button children='삭제' onClick={() => mutate(data.id)} />
          </div>
        ) : (
          <Button children='팔로우' />
        )}
      </div>

      <div className='flex gap-2'>
        {data.tag.map((tag) => (
          <Tag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} />
        ))}
      </div>
      <div className='flex justify-end text-dark-gray'>
        조회수 {data.viewCnt}
      </div>
      <ContentBar mkdStr={data.content} />
      <div className='my-24'>
        <p className='mb-8 text-2xl font-semibold border-b-2 border-main-color'>
          {data.commentCnt}개의 댓글
        </p>
        <div className='flex flex-col items-end justify-end gap-4 mb-2'>
          <CommentInput onCommentChange={setComment} comment={comment} />
          <Button children='댓글 작성' onClick={handleSubmit} />
        </div>
        {data.comment.map((comment) => (
          <div key={comment.id} className='mb-10 text-lg'>
            <CommentBar
              userName={comment.nickName}
              date={commentCreatedDate}
              imageUrl={comment.profileImage}
              comment={comment.content}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const ErrorFallback = () => {
  return (
    <div className='py-10 text-center'>
      <h2 className='text-xl font-bold'>잘못된 접근입니다</h2>
      <p className='mt-2 text-gray-600'>게시글을 찾을 수 없습니다</p>
    </div>
  )
}

const BoardDetail = () => {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-screen'>
            <Loader />
            <span className='ml-3 text-lg text-gray-700'>Loading...</span>
          </div>
        }
      >
        <BoardDetailContent id={id!} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default BoardDetail
