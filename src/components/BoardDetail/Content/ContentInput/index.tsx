import MDEditor, {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import usePostFile from '../../../../apis/board/usePostFile.ts'
import { FormValues } from '../../../../types'
import './mdeditor-styles.css'

interface ContentInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<FormValues>
  setValue: UseFormSetValue<FormValues>
  rules?: object
}

/**
 * 본문입력 컴포넌트
 * @description
 * 게시글 본문을 작성하는 본문입력 컴포넌트로, 다음 props를 받아 사용합니다:
 * - placeholder: 입력 전 표시될 안내 텍스트
 * - control: React Hook Form의 form 상태 제어
 * - setValue: React Hook Form의 form 값 설정 함수
 *
 * MDEditor를 사용하여 마크다운 편집 및 미리보기를 제공합니다.
 */

const ContentInput = ({
  placeholder = '본문을 입력해 주세요.',
  control,
  setValue,
  rules,
}: ContentInputProps) => {
  const postFile = usePostFile()

  const defaultCommands = commands
    .getCommands()
    .filter((cmd) => cmd.name !== 'image')

  const customImageCommand: ICommand = {
    name: 'image',
    keyCommand: 'image',
    buttonProps: { 'aria-label': 'Insert image' },
    icon: <span>Image</span>,
    execute: (state: TextState, api: TextAreaTextApi) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      console.log('input:', input)

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return

        try {
          // await 키워드 추가
          const response = await postFile(file)

          // 이미지 URL을 마크다운 형식으로 변환
          const imageMarkdown = `![${file.name}](${response})`

          // 현재 커서 위치에 이미지 마크다운을 삽입
          api.replaceSelection(imageMarkdown)

          // React Hook Form의 값도 업데이트
          const newValue =
            state.text.slice(0, state.selection.start) +
            imageMarkdown +
            state.text.slice(state.selection.end)
          setValue('content', newValue)
        } catch (error) {
          console.error('이미지 업로드 실패:', error)
          // 에러 처리 로직 추가
        }
      }
      // 파일 선택 다이얼로그 오픈
      input.click()
    },
  }

  return (
    <div className='relative w-full h-screen' data-color-mode='light'>
      <Controller
        name='content'
        rules={rules}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <MDEditor
              value={value}
              textareaProps={{
                placeholder: placeholder,
                className: error ? 'border-red-500' : '',
              }}
              onChange={(newValue?: string) => {
                onChange(newValue || '')
                setValue('content', newValue || '')
              }}
              preview='edit'
              className='w-full min-h-full text-lg custom-editor border-light-gray'
              commands={[...defaultCommands, customImageCommand]}
            />
            {error && (
              <p className='mt-1 text-sm text-red-500'>{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  )
}

export default ContentInput
