import { useLocation, useParams } from 'react-router-dom'
import { useFetchProfileInfo } from '../../../apis/profile/useFetchProfileInfo'
import {
  ErrorComponent,
  Loader,
  ProfileBoardList,
  ProfileInfo,
  ResumeDetail,
} from '../../../components'
import { useAuthStore } from '../../../store/AuthStore'

const ProfileContents = () => {
  const { id: profileId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tabName = queryParams.get('tab')

  const { data, isPending, isError } = useFetchProfileInfo(profileId)
  const isMyProfile = useAuthStore.getState().memberId === data?.memberId

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
              isMyProfile={isMyProfile}
              memberId={data.memberId}
              nickName={data.nickname}
              profileImg={data.profileImage}
              about={data.about}
              boardCnt={data.boardCount}
              followerCnt={data.followerCount}
              followingCnt={data.followingCount}
              following={data.following}
            />
          )}
        </>
      )}
    </section>
  )
}

export default ProfileContents
