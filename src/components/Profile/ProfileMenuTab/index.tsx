import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { PROFILE_MENU_TABS } from '../../../constant'

export const ProfileMenuTab = () => {
  const location = useLocation()
  const isActive = (path: string) =>
    location.pathname + location.search === path

  return (
    <aside className='min-w-64 h-fit border-r-[1px] border-light-gray'>
      <ul className='flex flex-col gap-4 pr-5'>
        {PROFILE_MENU_TABS.map((item) => (
          <li
            key={item.tab}
            className={twMerge(
              'px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer text-board-dark-gray hover:bg-sub-color',
              isActive(`${location.pathname}${item.query}`) &&
                'bg-board-light-gray text-main-color',
            )}
          >
            <Link
              to={`${location.pathname}${item.query}`}
              className='block w-full'
            >
              {item.tab}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ProfileMenuTab
