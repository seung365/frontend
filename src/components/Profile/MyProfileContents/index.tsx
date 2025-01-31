import { useLocation } from 'react-router-dom'
import useFetchMyProfileInfo from '../../../apis/profile/useFetchMyProfileInfo'
import {
  ErrorComponent,
  Loader,
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
  if (isPending) {
    return (
      <section className='flex flex-col items-center justify-center w-full h-full'>
        <Loader />
        <h1>Loading...</h1>
      </section>
    )
  }
  if (isError) {
    return <ErrorComponent />
  }
  return (
    <section className='w-full px-8'>
      {data && (
        <>
          {tabName === 'board' ? (
            <ProfileBoardList memberId={data.memberId} />
          ) : tabName === 'resume' ? (
            <ResumeDetail memberId={data.memberId} />
          ) : (
            <ProfileInfo
              isMyProfile
              nickName={data.nickname}
              memberId={data.memberId}
              profileImg={data.profileImage}
              about={data.about}
              boardCnt={data.boardCount}
              followerCnt={data.followerCount}
              followingCnt={data.followingCount}
              following={data.following}
              boardStatistics={ProfileData.board_statistics}
            />
          )}
        </>
      )}
    </section>
  )
}

export default MyProfileContents
