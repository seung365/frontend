import { BoardCard, Grid } from '../../../components'
import { boardPageBoardLit } from '../../../mocks/boardList'

interface ProfileBoardListProps {
  memberId: string
}

/**
 * 프로필 내에 작성한 게시글 리스트 조회 컴포넌트
 * @description
 * memberId를 통해 게시물 리스트 조회 예정.
 */

const ProfileBoardList = ({ memberId }: ProfileBoardListProps) => {
  console.log(memberId)
  return (
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
  )
}

export default ProfileBoardList
