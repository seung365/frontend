import { twMerge } from 'tailwind-merge'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {
  size?: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark'
}

const sizeClasses = {
  small: 'h-8 px-3 text-sm  text-sm rounded-md',
  medium: 'h-10 px-4 text-base rounded-lg',
  large: 'h-12 px-5 text-xl rounded-xl',
}

const themeClasses = {
  dark: 'bg-main-color text-white',
  light: 'bg-sub-color text-black',
}

/**
 * 버튼 컴포넌트
 * @description
 * 기본적인 버튼 컴포넌트로, 다음 props를 받아 사용합니다:
 * - children: 버튼 내부 콘텐츠
 * - size: 버튼 크기 (small, medium, large)
 * - theme: 버튼 테마 (light, dark)
 * - onClick: 클릭 이벤트 핸들러
 * - 기타 button HTML 속성들 모두 사용 가능
 */

const Button = ({
  size = 'medium',
  theme = 'dark',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'font-medium inline-flex hover:opacity-70 items-center justify-center',
        sizeClasses[size],
        themeClasses[theme],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
