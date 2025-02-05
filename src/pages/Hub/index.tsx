import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useGetHubList from '../../apis/hub/useGetHubList'
import {
  EmptyView,
  Filter,
  Grid,
  HubBanner,
  HubListSkeleton,
  Loader,
  ProfileCard,
} from '../../components'
import useIntersect from '../../hooks/useIntersect'
import { CheckTermType, TermType } from '../../types'

const Hub = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [sorting, setSorting] = useState<string>(() => {
    const sortParam = searchParams.get('sortType')
    return sortParam === 'popular' ? 'popular' : 'latest'
  })

  const [skills, setSkills] = useState<string[]>(() => {
    return searchParams.getAll('skills')
  })

  const [term, setTerm] = useState<CheckTermType>(() => {
    const termParam = searchParams.get('employmentPeriod') as TermType
    return termParam || '전체'
  })
  const params = new URLSearchParams(searchParams)
  const queryString = params.toString()

  const {
    contents: users,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetHubList(queryString)

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetchingNextPage && entry.intersectionRatio >= 0.1) {
      fetchNextPage()
    }
  })

  useEffect(() => {
    const sortParam = searchParams.get('sortType')
    setSorting(sortParam === 'popular' ? 'popular' : 'latest')

    const skillParams = searchParams.getAll('skills')
    setSkills(skillParams)

    const termParam = searchParams.get('employmentPeriod') as TermType
    setTerm(termParam || '전체')
  }, [searchParams])

  const handleSortingChange = (newSorting: string) => {
    setSorting(newSorting)
    const params = new URLSearchParams(searchParams)
    params.set('sortType', newSorting)
    setSearchParams(params)
  }
  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills)
    const params = new URLSearchParams(searchParams)

    params.delete('skills')

    newSkills.forEach((skill) => {
      params.append('skills', skill)
    })

    if (newSkills.length === 0) {
      params.delete('skills')
    }

    setSearchParams(params)
  }
  const handleTermChange = (newTerm: CheckTermType) => {
    const params = new URLSearchParams(searchParams)

    if (newTerm === '전체') {
      params.delete('employmentPeriod')
      setTerm(newTerm)
    } else {
      params.set('employmentPeriod', newTerm)
      setTerm(newTerm)
    }

    setSearchParams(params)
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 my-4 '>
        <HubBanner />
        <div className='flex flex-row gap-4'>
          <Grid type='board'>
            {users.length > 0 ? (
              users.map((profile) => (
                <ProfileCard
                  key={profile.profileId}
                  profileId={profile.profileId}
                  profileImg={profile.profileImage}
                  nickname={profile.nickname}
                  about={profile.about}
                />
              ))
            ) : (
              <EmptyView />
            )}
            <div className='flex justify-center w-full col-span-full'>
              {status === 'pending' && (
                <HubListSkeleton isInitialLoading={!users.length} />
              )}
              {isFetchingNextPage && <Loader size='s' />}
            </div>
            <div ref={ref} />
          </Grid>
          <Filter
            skills={skills}
            onSkills={handleSkillsChange}
            onSorting={handleSortingChange}
            onTerm={handleTermChange}
            sorting={sorting}
            term={term}
          />
        </div>
      </div>
    </div>
  )
}

export default Hub
