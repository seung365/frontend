interface WriterBarProps {
  profile_id: string
  date: string
  profile_img: string
}

/**
 * 작성자 정보 표시 컴포넌트
 * @description
 * 게시글 작성자의 정보를 표시하는 컴포넌트로, 다음 props들을 받아서 사용합니다:
 * - profile_id: 작성자의 아이디
 * - date: 작성 날짜
 * - profile_img: 프로필 이미지 URL
 *
 * 프로필 이미지, 작성자 ID, 작성 날짜를 가로로 배치하여 보여주는 컴포넌트입니다.
 */

const WriterBar = ({ profile_id, date, profile_img }: WriterBarProps) => {
  return (
    <div className='flex items-center gap-3 my-6 align-center'>
      <img src={profile_img} className='object-cover w-10 h-10 rounded-full' />
      <span className='font-semibold'>{profile_id}</span>
      <span className='text-dark-gray'>{date}</span>
    </div>
  )
}

export default WriterBar
