import { ResponseSkills } from '../../../../types'

interface SkillDetailsProps {
  skills: ResponseSkills[]
}

const SkillDetails = ({ skills }: SkillDetailsProps) => {
  return (
    <>
      {skills.length > 0 && (
        <div className='p-4 border rounded-lg shadow-sm'>
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill) => (
              <span
                className='inline-flex items-center px-3 py-1 text-sm rounded-full bg-sub-color-2 text-main-black'
                key={skill.id}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SkillDetails
