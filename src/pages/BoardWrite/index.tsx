import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import usePostBoard from '../../apis/board/usePostBoard.ts'
import {
  Button,
  ChooseTagModal,
  ContentInput,
  Dropdown,
  Loader,
  Tag,
  TitleInput,
  WarningModal,
} from '../../components'
import { contentTemplates } from '../../constant'
import { categories, tagName } from '../../mocks/data' // tagName 추가
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

  const [tagModalOpen, setTagModalOpen] = useState(false)
  const [warningModalOpen, setWarningModalOpen] = useState(false)
  const [pendingCategory, setPendingCategory] = useState<number | null>(null)

  const selectedTags = watch('tags', [])
  const selectedCategory = watch('categoryId')
  const content = watch('content')

  const { mutate, status } = usePostBoard()

  useEffect(() => {
    if (selectedCategory && contentTemplates[selectedCategory]) {
      setValue('content', contentTemplates[selectedCategory])
    }
  }, [selectedCategory, setValue])

  const handleCategoryChange = (newCategory: number) => {
    if (content && content !== contentTemplates[selectedCategory]) {
      setPendingCategory(newCategory)
      setWarningModalOpen(true)
    } else {
      setValue('categoryId', newCategory)
      if (contentTemplates[newCategory]) {
        setValue('content', contentTemplates[newCategory])
      }
    }
  }

  const confirmCategoryChange = () => {
    if (pendingCategory) {
      setValue('categoryId', pendingCategory)
      if (contentTemplates[pendingCategory]) {
        setValue('content', contentTemplates[pendingCategory])
      }
      setWarningModalOpen(false)
      setPendingCategory(null)
    }
  }

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
    mutate(data)
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
            onChange={handleCategoryChange}
          />
          <Button
            children='태그 선택'
            onClick={() => setTagModalOpen(true)}
            type='button'
          />
        </div>

        <ChooseTagModal
          isOpen={tagModalOpen}
          onClose={() => setTagModalOpen(false)}
          tagName={tagName}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />

        <WarningModal
          isOpen={warningModalOpen}
          onClose={() => setWarningModalOpen(false)}
          pendingCategory={pendingCategory}
          setPendingCategory={setPendingCategory}
          onConfirm={confirmCategoryChange}
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
        <Button type='submit' children='게시하기' />
      </div>
    </form>
  )
}

export default BoardWrite
