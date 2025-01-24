/*
Header 컴포넌트
- 전체적인 Layout을 잡기 위해 설계.
- 아직 특별한 기능은 넣지 않고 구조만 잡기위해 설계.
*/

import { Link, NavLink, useNavigate } from 'react-router-dom'

const navList = [
  { path: '/board', name: '커뮤니티' },
  { path: '/hub', name: '허브' },
  { path: '/my', name: '프로필' },
]

const Header = () => {
  const navigate = useNavigate()
  const navActiveClassName = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return 'text-main-color font-bold'
    }
  }
  return (
    <header className='fixed top-0 left-0 z-50 bg-white w-full h-[60px] flex justify-center border-b'>
      <div className='w-full max-w-[1060px] flex justify-between items-center'>
        <Link to='/'>
          <h1 className='text-size-title'>DevInit</h1>
        </Link>
        <ul className='flex items-center gap-8'>
          {navList.map((menu) => (
            <li key={`menu-${menu.name}`}>
              <NavLink to={menu.path} className={navActiveClassName}>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className='flex items-center gap-4'>
          <button
            className='px-3 py-1 transition-colors border rounded-3xl border-main-color hover:bg-main-color hover:text-white'
            onClick={() => navigate('/board/write')}
          >
            새 글 작성
          </button>
          <button className='flex justify-center w-8 h-8'>
            <img
              src='https://placehold.co/600x400/png'
              alt='프로필이미지'
              className='w-8 h-8 rounded-full'
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
