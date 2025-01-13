import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import './mdeditor-styles.css'

interface ContentInputProps {
  placeholder?: string
  value?: string
  onChange?: (value?: string) => void
}

/*
  ContentInput
  Description:
    - 본문을 입력하는 컴포넌트
    - placeholder, value, onChange를 props로 받아서 사용
*/

const ContentInput = ({
  placeholder = '본문을 입력해 주세요.',
  value = '',
  onChange,
}: ContentInputProps) => {
  return (
    <div className='relative w-full h-auto max-w-4xl min-h-96'>
      <MDEditor
        value={value}
        onChange={onChange}
        textareaProps={{
          placeholder: placeholder,
        }}
        preview='edit'
        className='w-full min-h-96 custom-editor'
      />
    </div>
  )
}

export default ContentInput
