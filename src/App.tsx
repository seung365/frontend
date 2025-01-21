import { useEffect } from 'react'
import usePostToken from './apis/member/usePostToken'
import { Routes } from './routes'
import './styles/global.css'

const App = () => {
  const postToken = usePostToken()

  useEffect(() => {
    const getToken = async () => {
      try {
        await postToken()
      } catch (error) {
        console.error('토큰 발급 실패:', error)
      }
    }

    getToken()
  }, [postToken])

  return <Routes />
}

export default App
