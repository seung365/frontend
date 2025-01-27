import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { UserInfo, UserResume } from '../../../../types'
import { Button } from '../../../index'
import UserInfoForm from '../UserInfoForm'

interface UserInfoResumeProps {
  register: UseFormRegister<UserResume>
  onSectionSubmit: (data: UserInfo) => void
  watchedData: UserInfo
  errors: FieldErrors<UserResume>
}

const UserInfoResume = ({
  register,
  onSectionSubmit,
  watchedData,
  errors,
}: UserInfoResumeProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const handleSectionSubmit = () => {
    if (!watchedData.position || !watchedData.summary) {
      return
    }

    onSectionSubmit(watchedData)
    setIsEdit(false)
  }

  return (
    <div className='flex flex-col items-end p-8 bg-white rounded-lg shadow-md'>
      <div className='flex flex-col w-full space-y-6'>
        <UserInfoForm
          register={register}
          errors={errors}
          watchedData={watchedData}
          isEdit={isEdit}
        />
      </div>
      {isEdit ? (
        <Button className='mt-4' onClick={handleSectionSubmit}>
          저장하기
        </Button>
      ) : (
        <Button
          theme='dark'
          type='button'
          className='mt-4'
          onClick={() => setIsEdit(true)}
        >
          수정하기
        </Button>
      )}
    </div>
  )
}

export default UserInfoResume
