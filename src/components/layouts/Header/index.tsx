/*
Header 컴포넌트
- 전체적인 Layout을 잡기 위해 설계.
- 아직 특별한 기능은 넣지 않고 구조만 잡기위해 설계.
*/

import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useLogout from '../../../apis/member/useLogout'
import useGetProfileImage from '../../../apis/profile/useGetProfileImage'
import { useAuthStore } from '../../../store/AuthStore'
import { useProfileImageStore } from '../../../store/ProfileImageStore'

const navList = [
  { path: '/board', name: '커뮤니티' },
  { path: '/hub', name: '허브' },
  { path: '/my', name: '프로필' },
]

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const navActiveClassName = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return 'text-main-color font-bold'
    }
  }

  const isLogin = useAuthStore.getState().isLogin
  const setLogout = useAuthStore.getState().setLogout
  const profileImageData = useProfileImageStore.getState().profileImage
  const setProfileImage = useProfileImageStore.getState().setProfileImage

  const { data: profileHeaderImage } = useGetProfileImage()
  const { mutate: postLogout, status } = useLogout()

  useEffect(() => {
    if (isLogin && profileHeaderImage) {
      setProfileImage(profileHeaderImage)
    }
  }, [isLogin, profileHeaderImage, setProfileImage])

  const handleLogout = () => {
    postLogout()
  }

  if (status === 'success') {
    setLogout()
  }
  console.log(profileImageData)

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
        <div className='relative flex items-center justify-center w-12'>
          {isLogin ? (
            <>
              <button
                className='flex items-center justify-center w-12 h-12'
                onClick={(prev) => setIsDropdownOpen(!prev)}
              >
                <div className='w-full h-full'>
                  <img
                    src={profileImageData}
                    alt='프로필이미지'
                    className='object-cover w-full h-full rounded-full'
                  />
                </div>
              </button>
              {isDropdownOpen && (
                <div className='absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg'>
                  <ul className='py-2'>
                    <li
                      className='px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-100'
                      onClick={handleLogout}
                    >
                      로그아웃
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link className='text-main-color text-semibold' to='/signin'>
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
