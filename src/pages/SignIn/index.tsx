import GithubLogin from '../../assets/icons/githubLogin.svg?react'
import NaverLogin from '../../assets/icons/naverLogin.svg?react'
import { API_CONFIG } from '../../constant/config'

const SignIn = () => {
  const handleSocialLogin = (provider: 'NAVER' | 'GITHUB') => {
    window.location.href = API_CONFIG.AUTH[provider]
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-5 '>
      <p className='font-semibold'>개발자 커뮤니티 사이트</p>
      <h3 className='mb-6 text-3xl font-bold text-main-color'>DevInit</h3>
      <button type='button' onClick={() => handleSocialLogin('NAVER')}>
        <NaverLogin />
      </button>
      <button type='button' onClick={() => handleSocialLogin('GITHUB')}>
        <GithubLogin />
      </button>
    </div>
  )
}

export default SignIn
