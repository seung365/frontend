import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import SearchCancel from '../../assets/icons/search-cancel.svg?react'
import {
  BoardBanner,
  BoardCard,
  BoardCategoryTab,
  Button,
  Grid,
  SearchBar,
} from '../../components'
import { TAGS_NAME } from '../../constant'
import { boardList } from '../../mocks/boardList'

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
      <section className='flex flex-col gap-4'>
        <span className='text-main-black'>
          💁🏻‍♂️ 태그를 통해 원하는 정보들을 찾아보세요!
        </span>
        <section className='flex flex-wrap w-full h-auto gap-2'>
          {TAGS_NAME.map((name) => (
            <Button
              onClick={() => handleTagSelect(name)}
              theme={selectedTags.includes(name) ? 'dark' : 'light'}
              type='button'
              size='small'
            >
              {selectedTags.includes(name) ? (
                <span className='relative'>
                  {name}
                  <SearchCancel
                    className='absolute top-[2px] transform translate-x-1/2 -translate-y-1/2 -right-1'
                    width='12'
                    height='12'
                    fill='#FFFFFF'
                  />
                </span>
              ) : (
                name
              )}
            </Button>
          ))}
        </section>
      </section>

      {/* 카테고리/검색/태그로 필터링 되는 게시글 리스트*/}
      <section>
        <Grid type='board'>
          {boardList.map((item) => (
            <BoardCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              contentImg={item.contentImg}
              category={item.category}
              date={item.date}
              likeCnt={item.likeCnt}
              commentCnt={item.commentCnt}
              viewCnt={item.viewCnt}
              profileId={item.profileId}
              profileImg={item.profileImg}
              nickname={item.nickname}
            />
          ))}
        </Grid>
      </section>
    </section>
  )
}

export default Board
