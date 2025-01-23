import React, { useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import useFetchBoardList from '../../apis/board/useFetchBoardList'
import {
  BoardBanner,
  BoardCard,
  BoardCategoryTab,
  BoardListSkeleton,
  BoardTagFilter,
  ErrorComponent,
  Grid,
  Loader,
  NoResult,
  SearchBar,
} from '../../components'
import useTag from '../../hooks/useTag'
import findCategoryId from '../../utils/findCategoryId'

/**
 * TODO: 게시판 페이지 api 연결 작업 진행
 * 전체 게시글 조회 o
 * 카테고리별 게시글 조회 o
 * 검색 기능 o
 * 태그 선택으로 조회 o
 * http://localhost:8080/api/board?tagNames=SPRING&tagNames=C&searchContents=%EB%98%91%EB%98%91%ED%95%9C%EA%B0%9C%EB%B0%9C%EC%9E%90&size=10&page=1
 */

const Board = () => {
  const location = useLocation()
  const categoryId = findCategoryId(location.pathname)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const queryString = params.toString().replace('?', '$')
  const { selectedTags, handleTagSelect, clearTags } = useTag({
    params,
    setSearchParams,
  })

  const onSearch = (search?: string) => {
    if (search) {
      params.set('searchContents', search)
    } else {
      params.delete('searchContents')
    }
    setSearchParams(params)
  }

  useEffect(() => {
    clearTags()
  }, [location.pathname])

  const { data, status, ref, isFetchingNextPage, hasNextPage } =
    useFetchBoardList(categoryId, queryString)
  console.log(data)
  return (
    <section className='flex flex-col w-full h-full gap-8 py-10'>
      <BoardBanner pathname={location.pathname} />
      <section className='flex items-center justify-center w-full h-8'>
        <Link className='px-4 py-2 rounded-lg bg-main-color' to='/board/write'>
          <span className='text-white'>게시글 작성하러 가기</span>
        </Link>
      </section>
      <BoardCategoryTab pathname={location.pathname} />
      <section className='flex items-center justify-center w-full'>
        <SearchBar
          params={params}
          onSearchParams={setSearchParams}
          onSearch={onSearch}
          path={location.pathname}
        />
      </section>
      <BoardTagFilter
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />
      {status === 'pending' && <BoardListSkeleton type='board' />}
      {status === 'error' && <ErrorComponent />}
      {status === 'success' && (
        <Grid type='board'>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.content.map((board) => (
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

export default Board
