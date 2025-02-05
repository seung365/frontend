import { Education } from '../../../types'
import formatDateForInput from '../../../utils/formatDateInput'
import Button from '../../common/Button'

interface EducationDetailProps {
  education: Education
  onDelete?: (id: number) => void
}

const EducationDetails = ({ education, onDelete }: EducationDetailProps) => {
  const { id, organization, major, degree, startDate, endDate, status } =
    education

  return (
    <section className='p-4 space-y-4 border rounded-lg shadow-sm'>
      {/* 학교/기관명 */}
      <div>
        <h3 className='text-lg font-medium'>{organization}</h3>
      </div>

      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>전공:</span> {major}
        </p>
      </div>

      {/* 학위 */}
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>학위:</span> {degree}
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

      {/* 상태 */}
      {status && (
        <div>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>상태:</span> {status}
          </p>
        </div>
      )}

      {/* 삭제 버튼 */}
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

export default EducationDetails
