import { useNavigate } from 'react-router-dom'

const useLoginRedirect = () => {
  const navigate = useNavigate()

  const redirectToLogin = () => {
    if (
      confirm('로그인이 필요한 기능입니다.\n로그인 페이지로 이동하시겠습니까?')
    ) {
      navigate('/signin', {
        state: { from: window.location.pathname },
      })
    }
  }

  return redirectToLogin
}

export default useLoginRedirect
