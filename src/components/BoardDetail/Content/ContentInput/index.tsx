import MDEditor, {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { FormValues } from '../../../../pages/BoardWrite'
import './mdeditor-styles.css'

interface ContentInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<FormValues>
  setValue: UseFormSetValue<FormValues>
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
}: ContentInputProps) => {
  const content = useWatch({
    control,
    name: 'content',
    defaultValue: '',
  })

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

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return

        // 파일 업로드 로직
        const formData = new FormData()
        formData.append('image', file)

        console.log(state, api)
      }

      // 파일 선택 다이얼로그 오픈
      input.click()
    },
  }

  return (
    <div className='relative w-full h-screen' data-color-mode='light'>
      <MDEditor
        value={content}
        textareaProps={{
          placeholder: placeholder,
        }}
        onChange={(value?: string) => {
          setValue('content', value || '')
        }}
        preview='edit'
        className='w-full min-h-full text-lg custom-editor border-light-gray'
        commands={[...defaultCommands, customImageCommand]}
      />
    </div>
  )
}

export default ContentInput
