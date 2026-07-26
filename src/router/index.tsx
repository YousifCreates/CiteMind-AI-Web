import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '../constants'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AppShell from '../components/layout/AppShell'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Learn from '../pages/Learn'
import Roadmap from '../pages/Roadmap'
import Research from '../pages/Research'
import Assessment from '../pages/Assessment'
import Progress from '../pages/Progress'
import TopicVideo from '../pages/TopicVideo'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: ROUTES.HOME, element: <Learn /> },
          { path: ROUTES.LEARN, element: <Learn /> },
          { path: ROUTES.ROADMAP, element: <Roadmap /> },
          { path: ROUTES.ROADMAP_DETAIL, element: <Roadmap /> },
          { path: ROUTES.RESEARCH, element: <Research /> },
          { path: ROUTES.ASSESSMENT, element: <Assessment /> },
          { path: ROUTES.PROGRESS, element: <Progress /> },
          { path: ROUTES.TOPIC_VIDEO, element: <TopicVideo /> },
        ],
      },
    ],
  },
])

export default router
