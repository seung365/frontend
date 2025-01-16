import { BoardCard, Grid, ProfileSlider } from '../../components'
import { mainPageBoardList } from '../../mocks/boardList'

const Home = () => {
  return (
    <section className='flex flex-col w-full h-full gap-12 py-10 '>
      <ProfileSlider />
      {/* 추후에 컴포넌트로 분리 예정. */}
      <section>
        <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl'>
          🚀 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을 시작하세요!
        </span>
        <Grid type='main'>
          {mainPageBoardList.map((item) => (
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
              profileImg={item.profileImg}
              nickName={item.nickName}
              tags={item.tags}
            />
          ))}
        </Grid>
      </section>
    </section>
  )
}

export default Home
