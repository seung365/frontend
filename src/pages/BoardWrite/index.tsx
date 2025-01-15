import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  ContentInput,
  Dropdown,
  Modal,
  Tag,
  TitleInput,
} from '../../components'
import { categories, tagName } from '../../mocks/data'

export interface FormValues {
  title: string
  content: string
  category: string
  tags: string[]
}

const BoardWrite = () => {
  const { control, register, handleSubmit, setValue, watch } =
    useForm<FormValues>()

  const [open, setOpen] = useState(false)

  const selectedTags = watch('tags', [])

  const handleTagSelect = (tag: string) => {
    const currentTags = selectedTags || []
    const isTagSelected = currentTags.includes(tag)

    if (isTagSelected) {
      setValue(
        'tags',
        currentTags.filter((currentTag) => currentTag !== tag),
      )
    } else {
      setValue('tags', [...currentTags, tag])
    }
  }

  const onClickSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form
      className='flex flex-col py-10'
      onSubmit={handleSubmit(onClickSubmit)}
    >
      <div className='mt-1'>
        <div className='flex gap-4'>
          <Dropdown
            placeholder='카테고리 선택'
            options={categories}
            control={control}
            name='category'
          />
          <Button
            children='태그 선택'
            onClick={() => setOpen(true)}
            type='button'
          />
        </div>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          content={
            <div className='p-5'>
              <h1>태그 선택</h1>
              <div className='flex flex-wrap gap-2 mt-3'>
                {tagName.map((name) => (
                  <Button
                    children={name}
                    key={name}
                    type='button'
                    onClick={() => handleTagSelect(name)}
                    theme={selectedTags.includes(name) ? 'dark' : 'light'}
                  />
                ))}
              </div>
            </div>
          }
        />
        <div className='flex gap-2 mt-2'>
          {selectedTags.map((tag) => (
            <Tag
              key={tag}
              onClick={() => handleTagSelect(tag)}
              type='button'
            >{`${tag} ×`}</Tag>
          ))}
        </div>
      </div>
      <TitleInput register={register} />
      <div className='mt-3'>
        <ContentInput control={control} setValue={setValue} />
      </div>
      <div className='flex justify-end mt-5'>
        <Button type='submit' children='게시하기' />
      </div>
    </form>
  )
}

export default BoardWrite
