import { information } from '../../../../types'

interface UserInfoDetailsProps {
  information: information
}

const UserInfoDetails = ({ information }: UserInfoDetailsProps) => {
  const { employmentPeriod, name, portfolio, position, summary } = information
  return (
    <section className='p-4 space-y-3 border rounded-lg shadow-sm'>
      <div>
        <div className='mb-3'>
          <label className='block font-medium text-gray-700 text-medium'>
            이름
          </label>
          <h3 className='mt-1 text-lg font-semibold text-gray-900'>{name}</h3>
        </div>

        <div className='mb-3'>
          <label className='block font-medium text-gray-700 text-medium'>
            포지션
          </label>
          <h3 className='mt-1 text-lg font-semibold text-gray-900'>
            {position}
          </h3>
        </div>

        <div className='mb-3'>
          <label className='block font-medium text-gray-700 text-medium'>
            경력사항
          </label>
          <h3 className='mt-1 text-lg font-semibold text-gray-900'>
            {employmentPeriod}
          </h3>
        </div>

        <div className='mb-3'>
          <label className='block font-medium text-gray-700 text-medium'>
            한 줄 소개
          </label>
          <p className='mt-1 text-gray-600'>{summary}</p>
        </div>

        <div>
          <label className='block font-medium text-gray-700 text-md'>
            포트폴리오 (URL)
          </label>
          {portfolio ? (
            <a
              href={portfolio}
              target='_blank'
              rel='noopener noreferrer'
              className='block mt-1 text-blue-600 break-all hover:underline'
            >
              {portfolio}
            </a>
          ) : (
            <p className='mt-1 text-gray-600'>포트폴리오 정보 없음</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserInfoDetails
