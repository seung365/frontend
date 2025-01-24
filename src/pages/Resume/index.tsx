import { useForm } from 'react-hook-form'
import { ResumeContainer } from '../../components'
import { UserResume } from '../../types'

const Resume = () => {
  const { register, handleSubmit } = useForm<UserResume>()

  const onClickSubmit = (data: UserResume) => {
    console.log(data)
  }
  return (
    <section>
      <h1 className='mt-10 text-size-title text-main-black'>💁🏻‍♂️ 이력서 작성</h1>
      <form
        onSubmit={handleSubmit(onClickSubmit)}
        className='flex flex-col w-full h-full gap-12 py-10'
      >
        {/*인적사항 */}
        <ResumeContainer
          title='인적 사항'
          description='✏️ 본인에 대해서 작성해주세요!'
        ></ResumeContainer>
        {/*기술 스택 */}
        <ResumeContainer
          title='기술 스택'
          description='✏️ 기술스택을 설정해주세요!'
        ></ResumeContainer>

        {/*경력 */}
        <ResumeContainer
          title='경력'
          description='✏️ 경력사항을 입력해주세요!'
        ></ResumeContainer>

        {/*프로젝트 */}
        <ResumeContainer
          title='프로젝트'
          description='✏️ 프로젝트 내용에 대해 입력해주세요!'
        ></ResumeContainer>

        {/*대외활동 */}
        <ResumeContainer
          title='대외 활동'
          description='✏️ 대외활동 내용에 대해 입력해주세요!'
        ></ResumeContainer>

        {/*교육(학력) */}
        <ResumeContainer
          title='교육(학력)'
          description='✏️ 교육 이력이나 학력을 입력해주세요!'
        ></ResumeContainer>

        {/*외국어 */}
        <ResumeContainer
          title='외국어'
          description='✏️ 외국어 능력을 입력해주세요'
        ></ResumeContainer>
      </form>
    </section>
  )
}

export default Resume
