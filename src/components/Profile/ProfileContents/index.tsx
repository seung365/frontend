import { useLocation, useParams } from 'react-router-dom'
import {
  ProfileBoardList,
  ProfileInfo,
  ResumeDetail,
} from '../../../components'
import { ProfileData } from '../../../mocks/profileData'

/**
 * 프로필 관련된 컨텐츠 보관하는 컴포넌트
 * @description
 * 프로필 기본 정보 - profileId로 조회
 * 작성한 게시글 - memberId로 조회
 * 이력서 - memberId로 조회
 */

const ProfileContents = () => {
  const { id: profileId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tabName = queryParams.get('tab')
  const isMyProfile = !profileId // isMyProfile의 값에 따라 불러오는 api가 다름
  return (
    <section className='px-8'>
      {tabName ? (
        tabName === 'board' ? (
          <ProfileBoardList memberId={ProfileData.memberId} />
        ) : (
          <ResumeDetail memberId={ProfileData.memberId} />
        )
      ) : (
        <ProfileInfo
          isMyProfile={isMyProfile}
          nickName={ProfileData.nickname}
          profileImg={ProfileData.profile_image}
          about={ProfileData.about}
          boardCnt={ProfileData.board_cnt}
          followerCnt={ProfileData.follower_cnt}
          followingCnt={ProfileData.following_cnt}
          boardStatistics={ProfileData.board_statistics}
        />
      )}
    </section>
  )
}

export default ProfileContents
