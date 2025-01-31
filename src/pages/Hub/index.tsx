import { useMemo, useState } from 'react'
import useGetHubList from '../../apis/hub/useGetHubList'
import {
  Filter,
  FloatingButton,
  Grid,
  HubBanner,
  Loader,
  ProfileCard,
} from '../../components'
import useIntersect from '../../hooks/useIntersect'

export type SortingType = '최신순' | '인기순'
export type TermType =
  | '신입'
  | '1~3년차'
  | '4~6년차'
  | '7~9년차'
  | '10년차 이상'

const Hub = () => {
  const [sorting, setSorting] = useState<SortingType>('최신순')
  const [skills, setSkills] = useState<string[]>([])
  const [term, setTerm] = useState<TermType[]>([])

  console.log(sorting, skills, term)
  const { data, isFetching, hasNextPage, fetchNextPage } = useGetHubList()

  const users = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.contents) : []),
    [data],
  )

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })

  const handleSorting = (newSorting: SortingType) => {
    setSorting(newSorting)
  }
  const handleSkills = (newSkill: string) => {
    setSkills((prev) =>
      prev.includes(newSkill)
        ? prev.filter((s) => s !== newSkill)
        : [...prev, newSkill],
    )
  }

  const handleTerm = (newTerm: TermType) => {
    setTerm((prev) =>
      prev.includes(newTerm)
        ? prev.filter((t) => t !== newTerm)
        : [...prev, newTerm],
    )
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 my-4 '>
        <HubBanner />
        <div className='flex flex-row gap-4'>
          <Grid type='board'>
            {users.map((profile) => (
              <ProfileCard
                key={profile.profileId}
                profileId={profile.profileId}
                profileImg={profile.profileImg}
                nickname={profile.nickname}
                about={profile.about}
              />
            ))}
            <div className='flex justify-center w-full col-span-full'>
              {isFetching && <Loader size='s' />}
            </div>
          </Grid>
          <Filter
            skills={skills}
            onSkills={handleSkills}
            onSorting={handleSorting}
            onTerm={handleTerm}
          />
        </div>
        <div ref={ref} />
      </div>
      <FloatingButton />
    </div>
  )
}

export default Hub
