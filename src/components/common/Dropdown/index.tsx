import { Control, Controller } from 'react-hook-form'
import { Option } from '../../../mocks/data'
import { FormValues } from '../../../types'

interface SelectDropdownProps {
  placeholder: string
  options: Option[]
  control: Control<FormValues>
  name: 'categoryId' | 'title' | 'content'
  rules?: object
  onChange?: (value: number) => void
}
/**
 * 선택 드롭다운 컴포넌트
 * @description
 * react-hook-form의 Controller를 사용하여 구현된 드롭다운 컴포넌트로, 다음 props를 받아 사용합니다:
 * - placeholder: 드롭다운의 기본 선택창에 표시될 텍스트
 * - options: 드롭다운에서 선택 가능한 옵션 목록
 * - control: react-hook-form의 control 객체
 * - name: 폼 값에서 해당 드롭다운이 관리할 필드명
 * - rules: 폼 유효성 검사 규칙
 * - onChange: 값이 변경될 때 호출되는 콜백 함수
 * */

const Dropdown = ({
  placeholder,
  options,
  control,
  name,
  rules,
  onChange,
}: SelectDropdownProps) => {
  return (
    <div className='w-full max-w-xs'>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange: fieldOnChange, value },
          fieldState: { error },
        }) => (
          <div>
            <select
              value={value || ''}
              onChange={(e) => {
                const newValue = Number(e.target.value)
                fieldOnChange(newValue)
                onChange?.(newValue)
              }}
              className='w-full p-2 border rounded-md'
            >
              <option value='' disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className='mt-1 text-sm text-red-500'>{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default Dropdown
