import { publicInstance } from '../fetchInstance'

type PostTokenResponse = {
  access: string
  refresh: string
}

const usePostToken = async () => {
  const response = await publicInstance.post<PostTokenResponse>(
    '/reissue',
    {},
    { withCredentials: true },
  )
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access)
  }
}

export default usePostToken
