interface ContentInputProps {
  placeholder?: string
}

/*
  ContentInput
  Description:
    - 본문을 입력하는 textarea 컴포넌트
    - placeholder를 props로 받아서 사용
*/

const ContentInput = ({
  placeholder = '본문을 입력해 주세요.',
}: ContentInputProps) => {
  return (
    <div className='relative w-full h-auto max-w-4xl min-h-96'>
      <textarea
        className='w-full h-full p-6 text-xl font-semibold rounded-md resize-none cursor-text focus:outline-none'
        placeholder={placeholder}
      />
    </div>
  )
}

export default ContentInput
