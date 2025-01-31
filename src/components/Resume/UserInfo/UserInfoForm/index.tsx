import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { UserInfo, UserResume } from '../../../../types'

interface UserInfoFormProps {
  register: UseFormRegister<UserResume>
  watchedData: UserInfo
  errors: FieldErrors<UserResume>
  isEdit: boolean
}

const UserInfoForm = ({
  register,
  watchedData,
  errors,
  isEdit,
}: UserInfoFormProps) => {
  return (
    <div className='space-y-4'>
      {isEdit ? (
        <div className='space-y-4'>
          <div className='form-group'>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              이름 <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('userInfo.name', {
                required: '이름을 입력해주세요',
              })}
              type='text'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
            <label
              htmlFor='position'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              포지션 <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('userInfo.position', {
                required: '포지션을 입력해주세요',
              })}
              type='text'
              id='position'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
            {errors.userInfo?.position && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.userInfo.position.message}
              </p>
            )}
          </div>

          <div className='form-group'>
            <label
              htmlFor='summary'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              한 줄 소개 <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('userInfo.summary', {
                required: '한 줄 소개를 입력해주세요',
              })}
              type='text'
              id='summary'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
            {errors.userInfo?.summary && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.userInfo.summary.message}
              </p>
            )}
          </div>

          <div className='form-group'>
            <label
              htmlFor='portfolio'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              포트폴리오 (URL)
            </label>
            <input
              {...register('userInfo.portfolio', {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: '올바른 URL 형식이 아닙니다',
                },
              })}
              type='url'
              id='portfolio'
              placeholder='https://example.com'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            />
            {errors.userInfo?.portfolio && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.userInfo.portfolio.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='space-y-3'>
          <div>
            <div className='mb-3'>
              <label className='block font-medium text-gray-700 text-medium'>
                이름
              </label>
              <h3 className='mt-1 text-lg font-semibold text-gray-900'>
                {watchedData.name || '-'}
              </h3>
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-gray-700 text-medium'>
                포지션
              </label>
              <h3 className='mt-1 text-lg font-semibold text-gray-900'>
                {watchedData.position || '-'}
              </h3>
            </div>

            <div className='mb-3'>
              <label className='block font-medium text-gray-700 text-medium'>
                한 줄 소개
              </label>
              <p className='mt-1 text-gray-600'>{watchedData.summary || '-'}</p>
            </div>

            <div>
              <label className='block font-medium text-gray-700 text-md'>
                포트폴리오 (URL)
              </label>
              {watchedData.portfolio ? (
                <a
                  href={watchedData.portfolio}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block mt-1 text-blue-600 break-all hover:underline'
                >
                  {watchedData.portfolio}
                </a>
              ) : (
                <p className='mt-1 text-gray-600'>-</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfoForm
