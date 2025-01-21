import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import {
  BoardBanner,
  BoardCard,
  BoardCategoryTab,
  BoardTagFilter,
  Grid,
  SearchBar,
} from '../../components'
import { boardPageBoardLit } from '../../mocks/boardList'

interface FormValues {
  tags: string[]
}

const Board = () => {
  const location = useLocation()
  const { setValue, watch } = useForm<FormValues>()

  const selectedTags = watch('tags', [])

  const handleTagSelect = (tag: string) => {
    const currentTags = selectedTags || []
    const isTagSelected = currentTags.includes(tag)

    if (isTagSelected) {
      setValue(
        'tags',
        currentTags.filter((currentTag: string) => currentTag !== tag),
      )
    } else {
      setValue('tags', [...currentTags, tag])
    }
  }
  console.log(selectedTags)

  const onSearch = (search?: string) => {
    console.log(search)
  }

  return (
    <section className='flex flex-col w-full h-full gap-8 py-10'>
      {/* 각 카테고리 탭 마다 다른 내용 나오게 할 예정 */}
      <BoardBanner pathname={location.pathname} />
      {/* 카테고리 탭 */}
      <BoardCategoryTab pathname={location.pathname} />
      {/* 검색 및 필터링 */}
      <section className='flex items-center justify-center w-full'>
        <SearchBar onSearch={onSearch} />
      </section>
      {/* 태그들의 리스트를 보여주고 선택하고 없애기*/}
      <BoardTagFilter
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />
      {/* 카테고리/검색/태그로 필터링 되는 게시글 리스트 -> 검색 api 나오면 추후에 컴포넌트로 분리 예정*/}
      <section>
        <Grid type='board'>
          {boardPageBoardLit.map((item) => (
            <BoardCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              thumbnail={item.thumbnail}
              categoryId={item.categoryId}
              categoryName={item.categoryName}
              date={item.createdAt}
              upCnt={item.upCnt}
              commentCnt={item.commentCnt}
              viewCnt={item.viewCnt}
              tags={item.tags}
              profileImg={item.profileImg}
              nickName={item.nickName}
            />
          ))}
        </Grid>
      </section>
    </section>
  )
}

export default Board
