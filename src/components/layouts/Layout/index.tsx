import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'

/*
Layout 컴포넌트
- 전체적인 Layout을 잡기 위해 설계.
- 페이지 단위 개발을 하게된다면 main 태그 안에 Outlet을 넣어서 사용 예정.
*/

export const Layout = () => {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <Header />
      <main className='w-full mt-[60px] min-h-[calc(100vh-60px-145px)] max-w-[1060px] mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
