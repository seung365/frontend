import { useLocation, useParams } from 'react-router-dom'
import { useFetchProfileInfo } from '../../../apis/profile/useFetchProfileInfo'
import {
  ErrorComponent,
  Loader,
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

  const { data, isPending, isError } = useFetchProfileInfo(profileId)
  const isMyProfile =
    localStorage.getItem('memberId')?.trim() === data?.memberId.trim() // memberId 전역상태 관리 예정
  console.log(localStorage.getItem('memberId'))
  console.log(typeof data?.memberId)
  console.log(isMyProfile)

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
              boardStatistics={ProfileData.board_statistics}
            />
          )}
        </>
      )}
    </section>
  )
}

export default ProfileContents
