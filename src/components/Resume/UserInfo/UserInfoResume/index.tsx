import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import usePatchUserInfo from '../../../../apis/resume/userInfo/usePathUserInfo'
import usePostUserInfo from '../../../../apis/resume/userInfo/usePostUserInfo'
import { information, UserResume } from '../../../../types'
import { Button } from '../../../index'
import UserInfoForm from '../UserInfoForm'

interface UserInfoResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: information
  errors: FieldErrors<UserResume>
}

const UserInfoResume = ({
  register,
  watchedData,
  errors,
}: UserInfoResumeProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const { mutate: postUserInfo } = usePostUserInfo()
  const { mutate: patchUserInfo } = usePatchUserInfo(watchedData.id ?? 0)

  const handleSectionSubmit = () => {
    if (!watchedData.position || !watchedData.summary) {
      return
    }
    if (watchedData.id) {
      patchUserInfo(watchedData)
    } else {
      postUserInfo(watchedData)
    }
    setIsEdit(false)
  }
  return (
    <>
      <div className='flex flex-col p-4 border rounded-lg shadow-sm'>
        <UserInfoForm
          register={register}
          errors={errors}
          watchedData={watchedData}
          isEdit={isEdit}
        />
      </div>
      <div className='flex justify-center'>
        {isEdit ? (
          <Button className='mt-4' type='button' onClick={handleSectionSubmit}>
            저장하기
          </Button>
        ) : (
          <>
            {watchedData.name === '' ? (
              <Button type='button' onClick={() => setIsEdit(true)}>
                인적사항 작성하기
              </Button>
            ) : (
              <Button
                theme='dark'
                type='button'
                onClick={() => setIsEdit(true)}
              >
                수정하기
              </Button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default UserInfoResume
