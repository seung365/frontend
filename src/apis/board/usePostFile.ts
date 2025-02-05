import { authInstance } from '../fetchInstance'

const usePostFile = () => {
  const postFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await authInstance.post('/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
  return postFile
}

export default usePostFile
