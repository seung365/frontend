import MDEditor from '@uiw/react-md-editor'

interface ContentBarProps {
  mkdStr: string
}

const ContentBar = ({ mkdStr }: ContentBarProps) => {
  return (
    <div data-color-mode='light'>
      <MDEditor.Markdown source={mkdStr} className='w-full h-auto mt-10' />
    </div>
  )
}

export default ContentBar
