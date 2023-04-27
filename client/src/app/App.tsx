import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { router } from '../router/router'
import { Provider } from 'react-redux'
import store from '../store'

const App: FC = () => {

  return (
    <Provider store={store}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
