import debounce from 'lodash.debounce'
import { useEffect, useState } from 'react'

const useCheckMobileView = (breakpoint: number = 640) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

  useEffect(() => {
    const checkMobileView = () => {
      const width = window.innerWidth
      setIsMobile(width < breakpoint)
    }

    const debouncedCheckMobileView = debounce(checkMobileView, 200)

    checkMobileView()

    window.addEventListener('resize', debouncedCheckMobileView)

    return () => {
      window.removeEventListener('resize', debouncedCheckMobileView)
      debouncedCheckMobileView.cancel()
    }
  }, [breakpoint])

  return isMobile
}

export default useCheckMobileView
