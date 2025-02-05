import React from 'react'
import useFetchProfileBoardList from '../../../apis/profile/useFetchProfileBoardList'
import {
  BoardCard,
  BoardListSkeleton,
  ErrorComponent,
  Grid,
  Loader,
  NoResult,
} from '../../../components'
import { BoardCardType, BoardListResponse } from '../../../types'

interface ProfileBoardListProps {
  memberId: string
}

/**
 * 프로필 내에 작성한 게시글 리스트 조회 컴포넌트
 * @description
 * memberId를 통해 게시물 리스트 조회 예정.
 */

const ProfileBoardList = ({ memberId }: ProfileBoardListProps) => {
  const { data, hasNextPage, isFetchingNextPage, status, ref } =
    useFetchProfileBoardList(memberId)
  return (
    <section>
      <h1 className='mb-3 text-main-black text-size-title text-semibold'>
        ✏️ 작성한 게시글
      </h1>
      {status === 'pending' && <BoardListSkeleton type='main' />}
      {status === 'error' && <ErrorComponent />}
      {status === 'success' && (
        <Grid type='main'>
          {data?.pages.map((page: BoardListResponse, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.content.map((board: BoardCardType) => (
                <BoardCard key={board.id} {...board} />
              ))}
            </React.Fragment>
          ))}
        </Grid>
      )}
      {data?.pages[0].empty && <NoResult />}
      {hasNextPage && (
        <div ref={ref}>
          <section className='flex items-center justify-center w-full mt-3'>
            {isFetchingNextPage ? <Loader /> : null}
          </section>
        </div>
      )}
    </section>
  )
}

export default ProfileBoardList
