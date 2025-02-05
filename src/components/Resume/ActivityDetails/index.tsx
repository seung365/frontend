import { Activity } from '../../../types'
import formatDateForInput from '../../../utils/formatDateInput'
import Button from '../../common/Button'

interface ActivityDetailsProps {
  activity: Activity
  onDelete?: (id: number) => void
}

const ActivityDetails = ({ activity, onDelete }: ActivityDetailsProps) => {
  const { id, activityName, organization, startDate, endDate, description } =
    activity

  return (
    <section className='p-4 space-y-4 border rounded-lg shadown-sm'>
      {/* 활동명 */}
      <div>
        <h3 className='text-lg font-medium'>{activityName}</h3>
      </div>

      {/* 소속/기관명 */}
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>소속/기관명:</span> {organization}
        </p>
      </div>

      {/* 기간 */}
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

      {/* 설명 */}
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>설명:</span> {description}
        </p>
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
    </section>
  )
}

export default ActivityDetails
