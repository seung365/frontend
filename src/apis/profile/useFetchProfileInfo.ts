import { authInstance, publicInstance } from '../fetchInstance'

type ProfileInfoResponse = {
  profileId: string
  nickname: string
  about: string
  boardCount: number
  folllowerCount: number
  followingCount: number
  following: boolean
}

export const fetchProfileInfo = async (
  profileId?: string,
): Promise<ProfileInfoResponse> => {
  const response = await publicInstance.get<ProfileInfoResponse>(
    `/profile/${profileId}`,
  )
  console.log(response.data)
  return response.data
}

export const fetchMyProfileInfo = async (): Promise<ProfileInfoResponse> => {
  const response = await authInstance.get<ProfileInfoResponse>('/profile/me')
  console.log(response.data)
  return response.data
}
