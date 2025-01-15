import MDEditor from '@uiw/react-md-editor'

interface ContentBarProps {
  mkdStr: string
}

const ContentBar = ({ mkdStr }: ContentBarProps) => {
  return <MDEditor.Markdown source={mkdStr} className='w-full h-auto' />
}

export default ContentBar
