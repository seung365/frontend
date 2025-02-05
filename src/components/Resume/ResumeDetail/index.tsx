import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetResume from '../../../apis/resume/useGetResume'
import {
  AcitivtDetails,
  Button,
  EducationDetails,
  ExperienceDetails,
  LanguageDetails,
  Loader,
  ProjectDetails,
  ResumeContainer,
  SkillDetails,
  UserInfoDetails,
} from '../../../components'
import { useAuthStore } from '../../../store/AuthStore'
import {
  Activity,
  Education,
  Experience,
  Language,
  Project,
} from '../../../types'

interface ResumeDetailProps {
  memberId: string
}

/**
 * 이력서 조회 컴포넌트
 * @description
 * memberId로 이력서 상세내용 조회
 */

const ResumeDetail = ({ memberId }: ResumeDetailProps) => {
  const { data, status } = useGetResume(memberId)
  const [isMine, setIsMine] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (useAuthStore.getState().memberId === memberId) {
      setIsMine(true)
    }
  }, [memberId])

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-red-600'>이력서를 불러오는데 실패했습니다.</p>
      </div>
    )
  }

  return (
    <section className='flex flex-col w-full h-full gap-12'>
      <div className='flex justify-between gap-4'>
        <h1 className='text-main-black text-size-title text-semibold'>
          📋 이력서
        </h1>
        {isMine && (
          <Button
            size='small'
            type='button'
            onClick={() => navigate('/my/resume')}
          >
            내 이력서 관리
          </Button>
        )}
      </div>

      <ResumeContainer
        title='인적사항'
        description='💁🏻‍♂️ 본인의 소개를 담은 공간입니다!'
      >
        {data?.information && (
          <UserInfoDetails information={data.information} />
        )}
      </ResumeContainer>
      <ResumeContainer
        title='기술 스택'
        description='🔧 사용할 수 있는 기술 스택들을 어필하세요!'
      >
        {data?.skills && <SkillDetails skills={data.skills} />}
      </ResumeContainer>
      <ResumeContainer
        title='경력'
        description='📌 본인의 경력 사항들을 담은 공간입니다!'
      >
        {data?.experiences.map((experience: Experience) => (
          <ExperienceDetails
            key={`${experience.companyName}-${experience.id}`}
            experience={experience}
          />
        ))}
      </ResumeContainer>
      <ResumeContainer
        title='프로젝트'
        description='💻 어떤 프로젝트를 진행했는지 확인하는 공간입니다!'
      >
        {data?.projects.map((project: Project) => (
          <ProjectDetails
            key={`${project.projectName}-${project.id}`}
            project={project}
          />
        ))}
      </ResumeContainer>
      <ResumeContainer
        title='대외 활동'
        description='🏃🏻 어떤 대외 활동을 진행했는지 확인하는 공간입니다!'
      >
        {data?.activities.map((activity: Activity) => (
          <AcitivtDetails
            key={`${activity.activityName}-${activity.description}`}
            activity={activity}
          />
        ))}
      </ResumeContainer>
      <ResumeContainer
        title='교육(학력)'
        description='✏️ 학력이나 교육 내용을 담은 공간입니다!'
      >
        {data?.educations.map((education: Education) => (
          <EducationDetails
            key={`${education.id}-${education.major}`}
            education={education}
          />
        ))}
      </ResumeContainer>
      <ResumeContainer
        title='외국어'
        description='▶️ 외국어 능력을 확인할 수 있는 공간입니다!'
      >
        {data?.languages.map((language: Language) => (
          <LanguageDetails
            key={`${language.name}-${language.level}`}
            language={language}
          />
        ))}
      </ResumeContainer>
    </section>
  )
}

export default ResumeDetail
