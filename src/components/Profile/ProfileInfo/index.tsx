import { useState } from 'react'

import { useParams } from 'react-router-dom'
import useProfileFollow from '../../../apis/profile/useProfileFollow'
import useProfileUnfollow from '../../../apis/profile/useProfileUnFollow'
import EditIcon from '../../../assets/icons/edit.svg?react'
import {
  Button,
  Modal,
  ProfileEdit,
  ProfileHeatMap,
  StatItem,
} from '../../../components'

interface ProfileInfoProps {
  isMyProfile: boolean
  nickName: string
  memberId: string
  profileImg: string
  about: string
  boardCnt: number
  followerCnt: number
  followingCnt: number
  following: boolean
  boardStatistics: { date: string; board_count: number }[]
}
/**
 * 프로필 정보 컴포넌트
 * isMyProfile 값에 따라 프로필 수정이나 팔로우하기 버튼 같은 요소 처리
 * 프로필 수정은 모달로 작업할 예정.
 * @description
 */

const ProfileInfo = ({
  isMyProfile,
  nickName,
  memberId,
  profileImg,
  about,
  boardCnt,
  followerCnt,
  followingCnt,
  following: initialFollowing,
  boardStatistics,
}: ProfileInfoProps) => {
  const { id: profileId } = useParams()
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>(initialFollowing)

  const { mutate: postFollow, isPending: isFollowPending } =
    useProfileFollow(profileId)
  const { mutate: deleteFollow, isPending: isUnfollowPending } =
    useProfileUnfollow(profileId)

  const handleModalClose = () => {
    setIsEditOpen(false)
  }
  const handleFollow = () => {
    postFollow(memberId, {
      onSuccess: () => setFollowing(true),
      onError: (error) => console.error('팔로우 실패:', error),
    })
  }

  const handleUnFollow = () => {
    deleteFollow(memberId, {
      onSuccess: () => setFollowing(false),
      onError: (error) => console.error('언팔로우 실패:', error),
    })
  }

  const isLoading = isFollowPending || isUnfollowPending

  return (
    <section className='flex flex-col w-full'>
      <h1 className='mb-3 text-main-black text-size-title text-semibold'>
        👨🏻‍💻 프로필
      </h1>
      <section className='flex w-full gap-4'>
        <section className='flex flex-grow-[3] flex-col items-center justify-center gap-3'>
          <img
            src={profileImg}
            alt={nickName}
            className='object-cover w-40 h-40 rounded-full'
          />
          {!isMyProfile && (
            <Button
              onClick={following ? handleUnFollow : handleFollow}
              size='small'
              disabled={isLoading}
            >
              {isLoading
                ? following
                  ? '취소 중...'
                  : '팔로우 중...'
                : following
                ? '팔로우 취소'
                : '팔로잉 하기'}
            </Button>
          )}
        </section>

        <section className='flex flex-grow-[7] flex-col gap-4 p-2'>
          <section className='flex items-center gap-2'>
            <h1 className='text-xl font-semibold text-main-black'>
              {nickName}
            </h1>
            {isMyProfile && (
              <button
                className='border-[1px] border-main-color rounded-lg p-1'
                onClick={() => setIsEditOpen(true)}
              >
                <EditIcon fill='#212529' />
              </button>
            )}
          </section>

          <section className='flex gap-4'>
            <StatItem label='게시글' value={boardCnt} />
            <StatItem label='팔로워' value={followerCnt} />
            <StatItem label='팔로잉' value={followingCnt} />
          </section>
          <p className='border-[1px] text-[14px] px-3 py-2 rounded-xl max-w-[500px] h-32 border-main-color overflow-y-auto'>
            {about}
          </p>
        </section>
      </section>
      <section className='flex flex-col w-full gap-4 mt-5 '>
        <h1 className='text-main-black'>
          🔥 올해 <b>{nickName}</b> 님의 잔디는 이만큼 자랐어요!
        </h1>
        <ProfileHeatMap boardStatistics={boardStatistics} />
      </section>
      {isEditOpen && (
        <Modal
          isOpen={isEditOpen}
          content={
            <ProfileEdit
              nickName={nickName}
              profileImg={profileImg}
              about={about}
              onCloseModal={handleModalClose}
            />
          }
          onClose={handleModalClose}
        />
      )}
    </section>
  )
}

export default ProfileInfo
