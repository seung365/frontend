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
    <div className='p-4 border rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold'>{projectName}</h3>
      <p className='mt-2 text-sm text-gray-700'>{description}</p>

      <div className='mt-4 space-y-2'>
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
  )
}

export default ProjectDetails
