import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  size?: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark'
  onClick?: () => void
}

/*
  Button
  Description:
    - 버튼 컴포넌트
    - children, size, theme, onClick을 props로 받아서 사용
*/

const sizeClasses = {
  small: 'h-8 px-3 text-sm  text-sm rounded-md',
  medium: 'h-10 px-4 text-base rounded-lg',
  large: 'h-12 px-5 text-xl rounded-xl',
}

const themeClasses = {
  dark: 'bg-main-color text-white',
  light: 'bg-sub-color text-black',
}

const Button = ({
  children,
  size = 'medium',
  theme = 'dark',
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium inline-flex hover:opacity-70 items-center justify-center ${sizeClasses[size]} ${themeClasses[theme]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
