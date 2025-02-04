import { Button } from '../../../components'
import { Project } from '../../../types'
import formatDateForInput from '../../../utils/formatDateInput'

interface ProjectDetailsProps {
  project: Project
  onDelete?: (id: number) => void
}

const ProjectDetails = ({ project, onDelete }: ProjectDetailsProps) => {
  const {
    id,
    projectName,
    description,
    organization,
    startDate,
    endDate,
    link,
  } = project

  return (
    <div className='flex flex-col gap-3 p-4 border rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold'>{projectName}</h3>

      <div className='space-y-2'>
        {organization && (
          <div className='text-sm'>
            <span className='font-medium'>소속/기관명:</span> {organization}
          </div>
        )}

        {(startDate || endDate) && (
          <div className='text-sm'>
            <span className='font-medium'>기간:</span>{' '}
            {startDate && endDate
              ? `${formatDateForInput(startDate)} ~ ${formatDateForInput(
                  endDate,
                )}`
              : startDate
              ? `${formatDateForInput(startDate)} ~`
              : `~ ${formatDateForInput(endDate)}`}
          </div>
        )}

        {link && (
          <div className='text-sm'>
            <span className='font-medium'>링크:</span>{' '}
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              {link}
            </a>
          </div>
        )}
      </div>
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>프로젝트 설명:</span> {description}
        </p>
      </div>

      <div>
        {onDelete && id && (
          <Button
            size='small'
            theme='light'
            type='button'
            onClick={() => onDelete(id)}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
