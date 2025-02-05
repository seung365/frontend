export const RouterPath = {
  home: '/',
  board: 'board',
  categoryName: 'categoryName',
  id: 'id',
  detail: 'detail',
  write: 'write',
  my: 'my',
  resume: 'resume',
  profile: 'profile/:id',
  hub: 'hub',
  signin: 'signin',
  notFound: '*',
} as const

export const PROTECTED_ROUTES = [
  '/signin',
  '/',
  '/hub',
  '/board',
  '/board/community',
  '/board/programming',
  '/board/study',
  '/board/project',
  '/board/experience',
]
