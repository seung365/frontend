import { TAGS_NAME } from '../../../constant'
import Button from '../../common/Button'

interface BoardTagFilterProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

const BoardTagFilter = ({ selectedTags, onTagSelect }: BoardTagFilterProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <span className='text-main-black'>
        💁🏻‍♂️ 태그를 통해 원하는 정보들을 찾아보세요!
      </span>
      <section className='flex flex-wrap w-full h-auto gap-2'>
        {TAGS_NAME.map((name) => (
          <Button
            key={name}
            onClick={() => onTagSelect(name)}
            theme={selectedTags.includes(name) ? 'dark' : 'light'}
            type='button'
            size='small'
          >
            {name}
          </Button>
        ))}
      </section>
    </section>
  )
}

export default BoardTagFilter
