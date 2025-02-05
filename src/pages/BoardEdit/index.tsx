import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import useGetBoardDetail from '../../apis/board/useGetBoardDetail.ts'
import usePatchBoard from '../../apis/board/usePatchBoard.ts'
import {
  Button,
  ContentInput,
  Dropdown,
  Loader,
  Modal,
  Tag,
  TitleInput,
} from '../../components'
import { contentTemplates } from '../../constant'
import { categories, tagName } from '../../mocks/data'
import { FormValues, tagType } from '../../types'

const BoardWrite = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  const [open, setOpen] = useState(false)
  const selectedTags = watch('tags', [])
  const selectedCategory = watch('categoryId')
  const { id } = useParams()

  const { data } = useGetBoardDetail(id!)
  const { mutate, status } = usePatchBoard(id!)

  useEffect(() => {
    if (selectedCategory && contentTemplates[selectedCategory] && !data) {
      setValue('content', contentTemplates[selectedCategory])
    }
  }, [selectedCategory, setValue, data])

  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('content', data.content)
      setValue('categoryId', data.categoryId)

      if (data.tag && data.tag.length > 0) {
        setValue('tags', data.tag)
      }
    }
  }, [data, setValue])

  const handleTagSelect = (tag: tagType) => {
    const currentTags = selectedTags || []
    const isTagSelected = currentTags.some((t) => t.tagId === tag.tagId)

    if (isTagSelected) {
      setValue(
        'tags',
        currentTags.filter((currentTag) => currentTag.tagId !== tag.tagId),
      )
    } else {
      setValue('tags', [...currentTags, tag])
    }
  }

  const onClickSubmit = (data: FormValues) => {
    mutate({ formData: data, boardId: id! })
  }

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader />
        <span className='ml-3 text-lg text-gray-700'>Loading...</span>
      </div>
    )
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
            name='categoryId'
            rules={{ required: '카테고리를 선택해주세요' }}
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
                {tagName.map((tag) => (
                  <Button
                    children={tag.tagName}
                    key={tag.tagId}
                    type='button'
                    onClick={() => handleTagSelect(tag)}
                    theme={
                      selectedTags.some((t) => t.tagId === tag.tagId)
                        ? 'dark'
                        : 'light'
                    }
                  />
                ))}
              </div>
            </div>
          }
        />
        <div className='flex flex-wrap gap-2 mt-2'>
          {selectedTags.map((tag) => (
            <Tag
              type='button'
              key={tag.tagId}
              tagName={`${tag.tagName} ⨉`}
              tagId={tag.tagId}
              onClick={() => handleTagSelect(tag)}
            />
          ))}
        </div>
      </div>
      <TitleInput
        register={register}
        setValue={setValue}
        rules={{ required: '제목을 입력해주세요' }}
        error={errors.title}
      />
      <div className='mt-3'>
        <ContentInput
          control={control}
          setValue={setValue}
          rules={{ required: '본문을 입력해주세요' }}
        />
      </div>
      <div className='flex justify-end mt-5'>
        <Button type='submit' children='수정하기' />
      </div>
    </form>
  )
}

export default BoardWrite
