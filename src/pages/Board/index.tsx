import { BoardCard, Button, Grid, SearchBar } from '../../components'
import { boardList } from '../../mocks/boardList'

const Board = () => {
  const onSearch = (search?: string) => {
    console.log(search)
  }
  return (
    <section className='flex flex-col w-full h-full gap-12 py-10'>
      {/* 각 카테고리 탭 마다 다른 내용 나오게 할 예정 */}
      <section className='flex flex-col items-center justify-center gap-5 w-full p-4 h-36 bg-sub-color rounded-xl text-[#333333]'>
        <h3 className='text-size-title'>커뮤니티</h3>
        <span>
          🚀 여기는 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을
          시작하세요!
        </span>
      </section>
      <ul className='flex items-center justify-between h-10 p-4 rounded-xl'>
        <li>전체</li>
        <li>자유게시판</li>
        <li>코딩질문</li>
        <li>스터디</li>
        <li>프로젝트</li>
        <li>경험공유</li>
      </ul>
      <section className='flex items-center justify-center w-full gap-4'>
        <SearchBar onSearch={onSearch} />
        <Button size='large'>태그</Button>
      </section>
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
