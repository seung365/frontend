import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import { Button, ProjectForm } from '../../../components'
import { Project, UserResume } from '../../../types'

interface ProjectResumeProps {
  register: UseFormRegister<UserResume>
  control: Control<UserResume>
  getValues: (name: string) => Project[]
  onProjectsSubmit: (data: Project[]) => void
}

const ProjectResume = ({
  control,
  register,
  getValues,
  onProjectsSubmit,
}: ProjectResumeProps) => {
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects',
  })

  const handleSubmitAllProjects = () => {
    const projectsData = getValues('projects')
    onProjectsSubmit(projectsData)
  }

  return (
    <section className='flex flex-col w-full gap-3 '>
      {projectFields.map((field, index) => (
        <ProjectForm
          key={field.id}
          index={index}
          register={register}
          onRemove={() => removeProject(index)}
        />
      ))}
      <div className='flex flex-col items-center w-full gap-4'>
        {projectFields.length !== 0 && (
          <Button
            style={{ width: '20%' }}
            type='button'
            onClick={handleSubmitAllProjects}
          >
            작성
          </Button>
        )}
        <button
          type='button'
          onClick={() =>
            appendProject({
              name: '',
              description: '',
              organization: '',
              startDate: '',
              endDate: '',
              link: '',
            })
          }
          className='w-1/5 px-4 py-2 mx-auto text-white rounded-lg bg-dark-gray'
        >
          프로젝트 추가
        </button>
      </div>
    </section>
  )
}

export default ProjectResume
