import { useLocation, useParams } from 'react-router-dom'
import {
  BoardCard,
  Button,
  Grid,
  ProfileMenuTab,
  StatItem,
} from '../../components'
import { boardPageBoardLit } from '../../mocks/boardList'

const Profile = () => {
  const { id } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tabName = queryParams.get('tab')

  console.log(id)
  return (
    <section className='flex w-full h-full py-10'>
      <ProfileMenuTab
        pathname={location.pathname}
        queryString={location.search}
      />
      <section className='px-8'>
        {tabName ? (
          tabName === 'board' ? (
            <section>
              <h1 className='mb-3 text-main-black text-size-title text-semibold'>
                ✏️ 작성한 게시글
              </h1>
              <Grid type='main'>
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
          ) : (
            <section>
              <h1 className='mb-3 text-main-black text-size-title text-semibold'>
                📋 이력서
              </h1>
            </section>
          )
        ) : (
          <section>
            <h1 className='mb-3 text-main-black text-size-title text-semibold'>
              👨🏻‍💻 프로필
            </h1>
            <section className='flex w-full gap-4'>
              <section className='flex flex-grow-[3] flex-col items-center justify-center gap-3'>
                <img
                  src='https://placehold.co/600x400'
                  alt='프로필 이미지'
                  className='object-cover w-40 h-40 rounded-full'
                />
                <Button size='small'>팔로우 하기</Button>
              </section>

              <section className='flex flex-grow-[7] flex-col gap-4 p-2'>
                <h1 className='text-xl font-semibold text-main-black'>
                  min-s97
                </h1>
                <section className='flex gap-4'>
                  <StatItem label='게시글' value={3} />
                  <StatItem label='팔로워' value={145} />
                  <StatItem label='팔로잉' value={213} />
                </section>
                <p className='border-[1px] text-[14px] px-3 py-2 rounded-xl max-w-[500px] h-32 border-main-color overflow-y-auto'>
                  안녕하세요 제 이름은 김민성 입니다. 저는 프론트엔드 개발자를
                  지망하고 React를 공부하고 있습니다.안녕하세요 제 이름은 김민성
                  입니다. 저는 프론트엔드 개발자를 지망하고 React를 공부하고
                  있습니다.
                </p>
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  )
}

export default Profile
