import { useEffect, useState } from 'react'

const useCheckMobileView = (breakpoint: number = 640) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    return () => window.removeEventListener('resize', checkMobileView)
  }, [breakpoint])

  return isMobile
}

export default useCheckMobileView
