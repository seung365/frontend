import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
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
import { RouterPath } from './path'
import { ProtectedRoute } from './ProtectedRoute'

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
        path: RouterPath.board,
        children: [
          { index: true, element: <Board /> },
          { path: `:${RouterPath.categoryName}`, element: <Board /> },
          {
            path: `:${RouterPath.categoryName}/:${RouterPath.id}`,
            element: <BoardDetail />,
          },
          { path: RouterPath.write, element: <BoardWrite /> },
          {
            path: `${RouterPath.write}/:${RouterPath.id}`,
            element: <BoardEdit />,
          },
        ],
      },
      {
        path: RouterPath.my,
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <My /> },
          { path: RouterPath.resume, element: <Resume /> },
        ],
      },
      { path: RouterPath.profile, element: <Profile /> },
      { path: RouterPath.hub, element: <Hub /> },
      { path: RouterPath.notFound, element: <Navigate to={RouterPath.home} /> },
    ],
  },
  {
    path: RouterPath.signin,
    element: <SignIn />,
  },
])
