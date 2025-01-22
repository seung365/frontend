import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import usePostBoard from '../../apis/board/usePostBoard'
import {
  Button,
  ContentInput,
  Dropdown,
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

  const { mutate, status } = usePostBoard()

  useEffect(() => {
    if (selectedCategory && contentTemplates[selectedCategory]) {
      setValue('content', contentTemplates[selectedCategory])
    }
  }, [selectedCategory, setValue])

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
    console.log('게시글 작성 데이터:', data)
    mutate(data)
  }

  if (status === 'pending') {
    return <div>로딩 중...</div>
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
        <div className='flex gap-2 mt-2'>
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
        <Button type='submit' children='게시하기' />
      </div>
    </form>
  )
}

export default BoardWrite
