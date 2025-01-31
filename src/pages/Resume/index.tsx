import { useForm } from 'react-hook-form'
import {
  ActivityResume,
  EducationResume,
  ExperienceResume,
  LanguageResume,
  ProjectResume,
  ResumeContainer,
  SkillsResume,
  UserInfoResume,
} from '../../components/index'
import {
  Activity,
  Education,
  Experience,
  Language,
  Project,
  Skills,
  UserInfo,
  UserResume,
} from '../../types'

const Resume = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<UserResume>({
    defaultValues: {
      userInfo: {
        position: '',
        summary: '',
        portfolio: '',
      },
      skills: [],
      experiences: [
        {
          company_name: '',
          position: '',
          start_date: '',
          end_date: '',
          description: '',
        },
      ],
      projects: [
        {
          name: '',
          description: '',
          organization: '',
          startDate: '',
          endDate: '',
          link: '',
        },
      ],
      activities: [
        {
          activityName: '',
          organization: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      educations: [
        {
          organization: '',
          degree: '',
          major: '',
          startDate: '',
          endDate: '',
          status: '',
        },
      ],
      languages: [
        {
          name: '',
          level: '',
        },
      ],
    },
  })

  const userInfoData = watch('userInfo')
  const exprienceData = watch('experiences')

  const onClickSubmit = (data: UserResume) => {
    console.log(data)
  }

  const handleUserInfoSubmit = (data: UserInfo) => {
    console.log(data)
  }

  const handleSkillsSubmit = (data: Skills[]) => {
    console.log(data)
  }

  const handleExperienceSubmit = (data: Experience[]) => {
    console.log(data)
  }

  const handleProjectsSubmit = (data: Project[]) => {
    // 프로젝트에 해당되는 데이터
    console.log(data)
  }

  const handleActivitySubmit = (data: Activity[]) => {
    // 대외활동에 해당되는 데이터
    console.log(data)
  }

  const handleEducationSubmit = (data: Education[]) => {
    // 교육에 해당되는 데이터
    console.log(data)
  }

  const handleLaguageSubmit = (data: Language[]) => {
    // 외국어에 해당되는 데이터
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
        >
          <UserInfoResume
            register={register}
            onSectionSubmit={handleUserInfoSubmit}
            watchedData={userInfoData}
            errors={errors}
          />
        </ResumeContainer>

        {/*기술 스택 */}
        <ResumeContainer
          title='기술 스택'
          description='✏️ 기술스택을 설정해주세요!'
        >
          <SkillsResume
            control={control}
            onSectionSubmit={handleSkillsSubmit}
          />
        </ResumeContainer>

        {/*경력 */}
        <ResumeContainer title='경력' description='✏️ 경력사항을 입력해주세요!'>
          <ExperienceResume
            register={register}
            onSectionSubmit={handleExperienceSubmit}
            watchedData={exprienceData}
            control={control}
            errors={errors}
            trigger={trigger}
          />
        </ResumeContainer>

        {/*프로젝트 */}
        <ResumeContainer
          title='프로젝트'
          description='✏️ 프로젝트 내용에 대해 입력해주세요!'
        >
          <ProjectResume
            control={control}
            register={register}
            getValues={getValues}
            onProjectsSubmit={handleProjectsSubmit}
          />
        </ResumeContainer>

        {/*대외활동 */}
        <ResumeContainer
          title='대외 활동'
          description='✏️ 대외활동 내용에 대해 입력해주세요!'
        >
          <ActivityResume
            control={control}
            register={register}
            getValues={getValues}
            onActivitySubmit={handleActivitySubmit}
          />
        </ResumeContainer>

        {/*교육(학력) */}
        <ResumeContainer
          title='교육(학력)'
          description='✏️ 교육 이력이나 학력을 입력해주세요!'
        >
          <EducationResume
            control={control}
            register={register}
            getValues={getValues}
            onEducationSubmit={handleEducationSubmit}
          />
        </ResumeContainer>

        {/*외국어 */}
        <ResumeContainer
          title='외국어'
          description='✏️ 외국어 능력을 입력해주세요'
        >
          <LanguageResume
            control={control}
            register={register}
            getValues={getValues}
            onLanguageSubmit={handleLaguageSubmit}
          />
        </ResumeContainer>
      </form>
    </section>
  )
}

export default Resume
