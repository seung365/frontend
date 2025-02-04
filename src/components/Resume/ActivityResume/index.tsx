import { useState } from 'react'
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import useDeleteActivity from '../../../apis/resume/activity/useDeleteActivity'
import { AcitivtDetails, ActivityForm, Button } from '../../../components'
import { Activity, UserResume } from '../../../types'

interface ActivityResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: Activity[]
  control: Control<UserResume>
  getValues: (name: string) => Activity[]
  onActivitySubmit: (data: Activity[]) => void
}

const ActivityResume = ({
  control,
  register,
  getValues,
  onActivitySubmit,
  watchedData,
}: ActivityResumeProps) => {
  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: 'activities',
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { mutate: deleteActivity } = useDeleteActivity()

  const handleSubmitAllActivities = () => {
    const activitiesData = getValues('activities')
    onActivitySubmit(activitiesData)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    deleteActivity({ id })
  }

  return (
    <section className='flex flex-col w-full gap-3'>
      {activityFields.map((field, index) =>
        isEdit ? (
          <ActivityForm
            key={field.id}
            index={index}
            register={register}
            onRemove={() => removeActivity(index)}
          />
        ) : (
          <AcitivtDetails
            key={field.id}
            activity={watchedData[index]}
            onDelete={handleDelete}
          />
        ),
      )}
      <div className='flex justify-center gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            {activityFields.length !== 0 && (
              <Button type='button' onClick={handleSubmitAllActivities}>
                저장하기
              </Button>
            )}
            <Button
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
              className='bg-dark-gray'
            >
              대외활동 추가
            </Button>
          </div>
        ) : (
          <>
            {watchedData.length !== 0 ? (
              <Button type='button' onClick={() => setIsEdit(!isEdit)}>
                수정하기
              </Button>
            ) : (
              <Button
                type='button'
                onClick={() => {
                  setIsEdit(true)
                  appendActivity({
                    activityName: '',
                    organization: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  })
                }}
              >
                대외활동 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ActivityResume
