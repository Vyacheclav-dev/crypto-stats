import { createBrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import MainLayout from '../layouts/main-layout/MainLayout'
import Home from '../pages/home/Home'
import Dashboard from '../pages/dashboard/Dashboard'
import ErrorBoundary from '../components/error-boundary/ErrorBoundary'
import Error from '../pages/Error/Error'


export const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: Routes.HOME, element: <Home /> },
      { path: Routes.DASHBOARD, element: <Dashboard /> },
      { path: Routes.ERROR, element: <Error /> }
    ]
  }
])