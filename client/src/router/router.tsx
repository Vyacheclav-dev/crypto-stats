import { createBrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import MainLayout from '../layouts/main-layout/MainLayout'
import Home from '../pages/home/Home'
import OHLCCandlesticks from '../pages/ohlc_candlesticks/OHLCCandlesticks'
import ErrorBoundary from '../components/error-boundary/ErrorBoundary'
import Error from '../pages/error/Error'


export const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: Routes.HOME, element: <Home /> },
      { path: Routes.OHLC_Candlesticks, element: <OHLCCandlesticks /> },
      { path: Routes.ERROR, element: <Error /> }
    ]
  }
])