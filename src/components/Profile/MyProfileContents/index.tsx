import { useLocation } from 'react-router-dom'
import useFetchMyProfileInfo from '../../../apis/profile/useFetchMyProfileInfo'
import {
  ProfileBoardList,
  ProfileInfo,
  ResumeDetail,
} from '../../../components'
import { ProfileData } from '../../../mocks/profileData'
const MyProfileContents = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tabName = queryParams.get('tab')

  const { data, isPending, isError } = useFetchMyProfileInfo()
  console.log(data, isPending, isError)
  console.log(data)
  return (
    <section className='w-full px-8'>
      {tabName ? (
        tabName === 'board' ? (
          <ProfileBoardList memberId={ProfileData.memberId} />
        ) : (
          <ResumeDetail memberId={ProfileData.memberId} />
        )
      ) : (
        <ProfileInfo
          isMyProfile
          nickName={ProfileData.nickname}
          profileImg={ProfileData.profileImage}
          about={ProfileData.about}
          boardCnt={ProfileData.boardCount}
          followerCnt={ProfileData.followerCount}
          followingCnt={ProfileData.followingCount}
          following={ProfileData.following}
          boardStatistics={ProfileData.board_statistics}
        />
      )}
    </section>
  )
}

export default MyProfileContents
