import { Filter, Grid, ProfileCard } from '../../components'
import { profileList } from '../../mocks/profileList'

const Hub = () => {
  return (
    <div className='flex flex-row gap-4 my-4'>
      <Grid type='board'>
        {profileList.map((profile) => (
          <ProfileCard
            key={profile.profileId}
            profileId={profile.profileId}
            profileImg={profile.profileImg}
            nickname={profile.nickname}
            about={profile.about}
          />
        ))}
      </Grid>
      <Filter />
    </div>
  )
}

export default Hub
