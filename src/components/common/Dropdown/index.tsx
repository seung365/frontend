import { Control, Controller } from 'react-hook-form'
import { FormValues } from '../../../pages/BoardWrite/index'

interface SelectDropdownProps {
  placeholder: string
  options: string[]
  control: Control<FormValues>
  name: keyof FormValues
}
/**
 * 선택 드롭다운 컴포넌트
 * @description
 * react-hook-form의 Controller를 사용하여 구현된 드롭다운 컴포넌트로, 다음 props를 받아 사용합니다:
 * - placeholder: 드롭다운의 기본 선택창에 표시될 텍스트
 * - options: 드롭다운에서 선택 가능한 옵션 목록
 * - control: react-hook-form의 control 객체
 * - name: 폼 값에서 해당 드롭다운이 관리할 필드명
 *
 * */

const Dropdown = ({
  placeholder,
  options,
  control,
  name,
}: SelectDropdownProps) => {
  return (
    <div className='w-full max-w-xs'>
      <Controller
        name={name}
        control={control}
        rules={{ required: '카테고리를 선택해주세요' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <select
              value={value || ''}
              onChange={onChange}
              className='w-full p-2 border rounded-md'
            >
              <option value='' disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
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
