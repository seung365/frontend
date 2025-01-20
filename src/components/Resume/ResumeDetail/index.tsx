interface ResumeDetailProps {
  memberId: string
}

/**
 * 이력서 조회 컴포넌트
 * @description
 * memberId로 이력서 상세내용 조회
 */

const ResumeDetail = ({ memberId }: ResumeDetailProps) => {
  console.log(memberId)
  return (
    <section>
      <h1 className='mb-3 text-main-black text-size-title text-semibold'>
        📋 이력서
      </h1>
    </section>
  )
}

export default ResumeDetail
