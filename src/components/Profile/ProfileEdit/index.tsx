import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import PlusIcon from '../../../assets/icons/plus.svg?react'
import { Button } from '../../../components'

interface ProfileFormValues {
  profileImg: File | null
  nickName: string
  about: string
}

interface ProfileEditProps {
  nickName: string
  profileImg: string
  about: string
  onCloseModal: () => void
}

const ProfileEdit = ({
  nickName,
  profileImg,
  about,
  onCloseModal,
}: ProfileEditProps) => {
  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>({
    defaultValues: {
      profileImg: null,
      nickName: nickName,
      about: about,
    },
  })
  const [previewImg, setPreviewImg] = useState<string>(profileImg)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null
    if (imageFile) {
      const fileReader = new FileReader()

      fileReader.onloadend = () => {
        setPreviewImg(fileReader.result as string)
      }

      fileReader.readAsDataURL(imageFile)
      setValue('profileImg', imageFile)
    } else {
      setPreviewImg(profileImg)
      setValue('profileImg', null)
    }
  }

  const handleClickSubmit = (data: ProfileFormValues) => {
    console.log(data)
  }

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(handleClickSubmit)}
    >
      <h1>프로필 수정</h1>
      <section className='relative flex justify-center'>
        {previewImg && (
          <img
            className='object-cover w-24 h-24 rounded-full border-[1px]'
            src={previewImg}
            alt={nickName}
          />
        )}
        <button
          className='absolute bottom-0 transform translate-x-16 w-6 h-6 border-[1px] bg-main-color flex items-center justify-center rounded-md'
          onClick={() => fileInputRef.current?.click()}
        >
          <PlusIcon width='20' height='20' fill='#FFFFFF' />
        </button>
        <input
          {...register('profileImg')}
          ref={fileInputRef}
          className='hidden'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
        />
      </section>

      <section className='flex flex-col gap-3'>
        <label
          htmlFor='nickName'
          className='block text-sm font-medium text-gray-700'
        >
          닉네임
        </label>
        <input
          {...register('nickName')}
          id='nickName'
          className='text-size-body w-full placeholder-gray-400 border-b-[1px] border-dark-gray focus:outline-none focus:ring-b-1 focus:ring-main-color focus:border-b-main-color'
          type='text'
          placeholder='닉네임을 입력하세요'
        />
      </section>
      <section className='flex flex-col gap-3'>
        <label htmlFor='about' className='text-sm font-medium text-gray-700'>
          소개
        </label>
        <textarea
          {...register('about')}
          id='about'
          className='w-full p-3 text-size-body placeholder-gray-400 border-[1px] rounded-lg resize-none border-dark-gray focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='자기소개를 입력하세요'
          rows={4}
        />
      </section>
      <section className='flex justify-center gap-4'>
        <Button theme='light' onClick={onCloseModal}>
          닫기
        </Button>
        <Button type='submit'>작성</Button>
      </section>
    </form>
  )
}

export default ProfileEdit
