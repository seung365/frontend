import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components'
import Board from '../pages/Board'
import BoardDetail from '../pages/BoardDetail'
import BoardEdit from '../pages/BoardEdit'
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
          { path: ':categoryName', element: <Board /> },
          { path: ':categoryName/:id', element: <BoardDetail /> },
          { path: 'write', element: <BoardWrite /> },
          { path: 'write/:id', element: <BoardEdit /> },
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
