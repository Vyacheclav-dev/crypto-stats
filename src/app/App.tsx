import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { router } from '../router/router'

const App: FC = () => {

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

export default App
