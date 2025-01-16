import { SKILL_LIST } from '../../../constant'
import Button from '../../common/Button'

const Filter = () => {
  return (
    <div className='border w-[300px] h-[1000px] rounded-xl'>
      <div className='flex flex-col gap-10 p-4 '>
        <div className='flex flex-col gap-2'>
          <span className='text-base font-bold'>정렬</span>
          <select className='w-full h-10 border rounded-lg border-dark-gray'>
            <option value=''>최신순</option>
            <option value=''>인기순</option>
          </select>
        </div>
        <div className='flex flex-wrap gap-2'>
          <span className='text-base font-bold'>기술 검색</span>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='w-full h-10 border rounded-lg border-dark-gray'
          />
          {SKILL_LIST.map((skill: string) => (
            <Button theme='light'>{skill}</Button>
          ))}
        </div>
        <div className='flex flex-col gap-10 p-4 '>
          <span className='text-base font-bold'>재직 기간</span>
        </div>
      </div>
    </div>
  )
}

export default Filter
