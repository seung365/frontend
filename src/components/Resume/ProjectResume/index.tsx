import { useState } from 'react'
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import useDeleteProject from '../../../apis/resume/project/useDeleteProject'
import { Button, ProjectDetails, ProjectForm } from '../../../components'
import { Project, UserResume } from '../../../types'

interface ProjectResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: Project[]
  control: Control<UserResume>
  getValues: (name: string) => Project[]
  onProjectsSubmit: (data: Project[]) => void
}

const ProjectResume = ({
  control,
  register,
  getValues,
  onProjectsSubmit,
  watchedData,
}: ProjectResumeProps) => {
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects',
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { mutate: deleteProject } = useDeleteProject()

  const handleSubmitAllProjects = () => {
    const projectsData = getValues('projects')
    onProjectsSubmit(projectsData)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    deleteProject({ id })
  }

  return (
    <section className='flex flex-col w-full gap-3'>
      {projectFields.map((field, index) =>
        isEdit ? (
          <ProjectForm
            key={field.id}
            index={index}
            register={register}
            onRemove={() => removeProject(index)}
          />
        ) : (
          <ProjectDetails
            key={field.id}
            project={watchedData[index]}
            onDelete={handleDelete}
          />
        ),
      )}
      <div className='flex justify-center gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            {projectFields.length !== 0 && (
              <Button onClick={handleSubmitAllProjects}>저장하기</Button>
            )}

            <Button
              type='button'
              onClick={() =>
                appendProject({
                  projectName: '',
                  description: '',
                  organization: '',
                  startDate: '',
                  endDate: '',
                  link: '',
                })
              }
              className='bg-dark-gray'
            >
              프로젝트 추가
            </Button>
          </div>
        ) : (
          <>
            {watchedData.length !== 0 ? (
              <Button type='button' onClick={() => setIsEdit(!isEdit)}>
                수정하기
              </Button>
            ) : (
              <Button
                type='button'
                onClick={() => {
                  setIsEdit(true)
                  appendProject({
                    projectName: '',
                    description: '',
                    organization: '',
                    startDate: '',
                    endDate: '',
                    link: '',
                  })
                }}
              >
                프로젝트 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ProjectResume
