import { Language } from '../../../types'
import Button from '../../common/Button'

interface LanguageDetailsProps {
  language: Language
  onDelete?: (id: number) => void
}

const LanguageDetails = ({ language, onDelete }: LanguageDetailsProps) => {
  const { id, name, level } = language

  return (
    <section className='w-full p-4 space-y-4 border rounded-lg shadow-sm'>
      {/* 언어 이름 */}
      <div>
        <h3 className='text-lg font-medium'>{name}</h3>
      </div>

      {/* 수준 */}
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>수준:</span> {level}
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

export default LanguageDetails
