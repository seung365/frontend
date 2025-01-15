import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

/*
Grid Container 컴포넌트
-게시물 리스트를 나타낼때 사용할 Grid Container 컴포넌트
-type을 받아와서 사용
-메인페이지: cols:2 gap:8
-게시판페이지: cols:3 gap:8
*/

interface GridProps {
  type: 'main' | 'board' | 'profile'
  children: ReactNode
}

const gridClassName = {
  main: 'grid-cols-2',
  board: 'grid-cols-3',
  profile: 'grid-cols-4',
}

const Grid = ({ children, type }: GridProps) => {
  const gridStyle = twMerge('grid w-full gap-8', gridClassName[type])
  return <section className={gridStyle}>{children}</section>
}

export default Grid
