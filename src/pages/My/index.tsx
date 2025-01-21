import { ProfileContents, ProfileMenuTab } from '../../components'

const My = () => {
  return (
    <section className='flex w-full h-full py-10'>
      <ProfileMenuTab />
      <ProfileContents />
    </section>
  )
}

export default My
