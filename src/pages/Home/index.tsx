import React from 'react'
import useFetchAllBoards from '../../apis/board/useFetchAllBoards'
import {
  BoardCard,
  BoardListSkeleton,
  Grid,
  Loader,
  ProfileSlider,
} from '../../components'
import { BoardCardType, BoardListResponse } from '../../types'

const Home = () => {
  const { data, status, ref, isFetchingNextPage, hasNextPage } =
    useFetchAllBoards()

  return (
    <section className='flex flex-col w-full h-full gap-12 py-10'>
      <ProfileSlider />
      <section>
        <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl'>
          🚀 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을 시작하세요!
        </span>
        {status === 'pending' && <BoardListSkeleton type='main' />}
        {status === 'error' && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-lg text-red-500'>
              데이터를 불러오는 중 오류가 발생했습니다.
            </h1>
            <button
              className='px-4 py-2 text-white rounded-md bg-main-color'
              onClick={() => window.location.reload()}
            >
              다시 시도하기
            </button>
          </div>
        )}

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
