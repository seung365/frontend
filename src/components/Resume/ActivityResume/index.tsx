import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import { ActivityForm, Button } from '../../../components'
import { Activity, UserResume } from '../../../types'

interface ActivityResumeProps {
  register: UseFormRegister<UserResume>
  control: Control<UserResume>
  getValues: (name: string) => Activity[]
  onActivitySubmit: (data: Activity[]) => void
}

const ActivityResume = ({
  control,
  register,
  getValues,
  onActivitySubmit,
}: ActivityResumeProps) => {
  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: 'activities',
  })
  const handleSubmitAllActivities = () => {
    const activitiesData = getValues('activities')
    onActivitySubmit(activitiesData)
  }
  return (
    <section className='flex flex-col w-full gap-3'>
      {activityFields.map((field, index) => (
        <ActivityForm
          key={field.id}
          index={index}
          register={register}
          onRemove={() => removeActivity(index)}
        />
      ))}
      <div className='flex flex-col items-center w-full gap-4'>
        {activityFields.length !== 0 && (
          <Button
            style={{ width: '20%' }}
            type='button'
            onClick={handleSubmitAllActivities}
          >
            작성
          </Button>
        )}
        <button
          type='button'
          onClick={() =>
            appendActivity({
              activityName: '',
              organization: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
          className='w-1/5 px-4 py-2 mx-auto text-white rounded-lg bg-dark-gray'
        >
          대외활동 추가
        </button>
      </div>
    </section>
  )
}

export default ActivityResume
