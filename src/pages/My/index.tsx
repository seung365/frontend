import { MyProfileContents, ProfileMenuTab } from '../../components'

const My = () => {
  return (
    <section className='flex w-full h-full py-10'>
      <ProfileMenuTab />
      <MyProfileContents />
    </section>
  )
}

export default My
