/*
Footer 컴포넌트
- 전체적인 Layout을 잡기 위해 설계.
- 아직 특별한 기능은 넣지 않고 구조만 잡기위해 설계.
*/

const Footer = () => {
  return (
    <footer className='flex justify-center w-full py-4 border-t'>
      <div className='w-full max-w-[1060px] flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <span className='text-size-title'>DevInit</span>
          <ul className='flex items-center gap-8'>
            <li>
              <a href='/'>도움말</a>
            </li>
            <li>
              <a href='/'>개인정보처리방침</a>
            </li>
            <li>
              <a href='/'>약관</a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 text-size-subbody text-dark-gray'>
          <span>DevInit | 대표이사 홍길동</span>
          <span>oooo시 oo구 ooooo로 oo길 | 전화번호: 000-00000-0000</span>
          <span>사업자 등록번호: 000-00-00000</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
