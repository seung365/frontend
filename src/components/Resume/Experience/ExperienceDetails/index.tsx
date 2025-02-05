import { Experience } from '../../../../types'

interface ExperienceDetailsProps {
  experience: Experience
}

const ExperienceDetails = ({ experience }: ExperienceDetailsProps) => {
  return (
    <section className='flex flex-col gap-2 p-4 border rounded-lg shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-gray-700'>
          {experience?.companyName}
        </h3>
        <p className='text-sm text-gray-600'>
          {`${experience.employmentType} | `}
          {experience?.position}
        </p>
      </div>
      <div className='text-sm text-gray-500'>
        <span>
          {experience?.startDate
            ? new Date(experience.startDate).toLocaleDateString()
            : ' '}
        </span>
        <span className='mx-2'>~</span>
        <span>
          {experience?.endDate
            ? new Date(experience.endDate).toLocaleDateString()
            : '현재 진행 중'}
        </span>
      </div>
      <p className='text-gray-700 whitespace-pre-line'>
        {experience?.description}
      </p>
    </section>
  )
}

export default ExperienceDetails
