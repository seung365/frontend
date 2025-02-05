import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileFormValues } from '../../components/Profile/ProfileEdit'
import { useProfileImageStore } from '../../store/ProfileImageStore'
import { ProfileInfoResponse } from '../../types'
import { authInstance } from '../fetchInstance'

type patchProfileInfo = {
  profile: {
    nickname: string
    about: string
  }
  profileImage: File | null
}

const patchProfileInfo = async (
  formData: ProfileFormValues,
): Promise<ProfileInfoResponse> => {
  const formDataObj = new FormData()

  // `profile` 객체를 JSON 문자열로 변환 후 추가
  const profileData = {
    nickname: formData.nickName,
    about: formData.about,
  }
  formDataObj.append(
    'profile',
    new Blob([JSON.stringify(profileData)], { type: 'application/json' }),
  )

  if (formData.profileImg) {
    formDataObj.append('profileImage', formData.profileImg)
  }

  const response = await authInstance.patch('/profile', formDataObj, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

const usePatchProfileInfo = () => {
  const queryClient = useQueryClient()
  const setProfileImage = useProfileImageStore.getState().setProfileImage

  const { mutate, status } = useMutation({
    mutationFn: patchProfileInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['MyProfileInfo'],
      })
      setProfileImage(data.profileImage)
    },
    onError: (error) => {
      console.error('수정 실패 ', error)
    },
  })

  return { mutate, status }
}

export default usePatchProfileInfo
