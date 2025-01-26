import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { UserInfo, UserResume } from '../../../types'
import { Button } from '../../index'

interface UserInfoResumeProps {
  register: UseFormRegister<UserResume>
  onSectionSubmit: (data: UserInfo) => void
  watchedData: UserInfo
}

const UserInfoResume = ({
  register,
  onSectionSubmit,
  watchedData,
}: UserInfoResumeProps) => {
  const [userInfo, setUserInfo] = useState(true)

  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      <div className='space-y-6'>
        <div>
          <label htmlFor='position' className='block text-sm font-medium'>
            포지션
          </label>
          {userInfo ? (
            <input
              {...register('userInfo.position')}
              type='text'
              id='position'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
          ) : (
            <p>{watchedData.position}</p>
          )}
        </div>
        <div>
          <label htmlFor='summary' className='block text-sm font-medium'>
            한 줄 소개
          </label>
          {userInfo ? (
            <input
              {...register('userInfo.summary')}
              type='text'
              id='summary'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
          ) : (
            <p>{watchedData.summary}</p>
          )}
        </div>
        <div>
          <label htmlFor='portfolio' className='block text-sm font-medium'>
            포트폴리오
          </label>
          {userInfo ? (
            <input
              {...register('userInfo.portfolio')}
              type='text'
              id='portfolio'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
          ) : (
            <p>{watchedData.portfolio}</p>
          )}
        </div>
      </div>
      {userInfo ? (
        <Button
          type='button'
          className='mt-4'
          onClick={() => {
            onSectionSubmit(watchedData)
            setUserInfo(false)
          }}
        >
          저장하기
        </Button>
      ) : (
        <Button
          theme='dark'
          type='button'
          className='mt-4'
          onClick={() => setUserInfo(true)}
        >
          수정하기
        </Button>
      )}
    </div>
  )
}

export default UserInfoResume
