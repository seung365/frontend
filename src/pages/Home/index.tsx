import React from 'react'
import useFetchBoardList from '../../apis/board/useFetchBoardList'
import {
  BoardCard,
  BoardListSkeleton,
  ErrorComponent,
  Grid,
  Loader,
  ProfileSlider,
} from '../../components'
import { BoardCardType, BoardListResponse } from '../../types'

const Home = () => {
  const { data, status, ref, isFetchingNextPage, hasNextPage } =
    useFetchBoardList()

  return (
    <section className='flex flex-col w-full h-full gap-12 py-10'>
      <ProfileSlider />
      <section>
        <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl'>
          🚀 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을 시작하세요!
        </span>
        {status === 'pending' && <BoardListSkeleton type='main' />}
        {status === 'error' && <ErrorComponent />}

        {status === 'success' && (
          <Grid type='main'>
            {data?.pages.map((page: BoardListResponse, pageIndex: number) => (
              <React.Fragment key={pageIndex}>
                {page.content.map((board: BoardCardType) => (
                  <BoardCard
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    content={board.content}
                    thumbnail={board.thumbnail}
                    categoryId={board.categoryId}
                    categoryName={board.categoryName}
                    date={board.createdAt}
                    upCnt={board.upCnt}
                    commentCnt={board.commentCnt}
                    viewCnt={board.viewCnt}
                    profileImg={board.profileImage}
                    nickName={board.nickName}
                    tags={board.tag}
                  />
                ))}
              </React.Fragment>
            ))}
          </Grid>
        )}
        {hasNextPage && (
          <div ref={ref}>
            <section className='flex items-center justify-center w-full mt-3'>
              {isFetchingNextPage ? <Loader /> : null}
            </section>
          </div>
        )}
      </section>
    </section>
  )
}

export default Home
