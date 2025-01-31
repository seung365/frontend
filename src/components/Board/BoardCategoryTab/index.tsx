import { Link } from 'react-router-dom'
import { BOARD_CATEGORY_TABS } from '../../../constant'

interface BoardCategoryTabProps {
  pathname: string
}

const BoardCategoryTab = ({ pathname }: BoardCategoryTabProps) => {
  return (
    <ul className='flex items-center justify-between h-10 p-4 text-board-dark-gray'>
      <li>
        <Link
          className={
            pathname === '/board'
              ? 'px-4 py-2 rounded-xl hover:text-main-color text-main-color bg-board-light-gray'
              : 'px-4 py-2'
          }
          to='/board'
        >
          전체
        </Link>
      </li>
      {BOARD_CATEGORY_TABS.map((category) => (
        <li key={category.id}>
          <Link
            className={
              pathname === category.path
                ? 'px-4 py-2 rounded-xl hover:text-main-color text-main-color bg-board-light-gray'
                : 'px-4 py-2'
            }
            to={category.path}
          >
            {category.categoryName}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BoardCategoryTab
