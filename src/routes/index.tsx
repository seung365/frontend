import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components'
import Board from '../pages/Board'
import BoardWrite from '../pages/BoardWrite'
import Home from '../pages/Home'
import Hub from '../pages/Hub'
import My from '../pages/My'
import Profile from '../pages/Profile'
import Resume from '../pages/Resume'
import SignIn from '../pages/SignIn'

export const Routes = () => {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'board',
        children: [
          { index: true, element: <Board /> },
          {
            path: ':categoryName',
            element: <Board />,
            children: [{ path: ':id', element: <Board /> }],
          },

          {
            path: 'write',
            element: <BoardWrite />,
            children: [{ path: 'write/:id', element: <BoardWrite /> }],
          },
        ],
      },
      {
        path: 'my',
        children: [
          { index: true, element: <My /> },
          { path: 'resume', element: <Resume /> },
        ],
      },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'hub', element: <Hub /> },
    ],
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
])
