import React, { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'
import { Routes } from '../../router/routes'


const MainLayout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(Routes.HOME)
    }
  }, [])


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    }}>
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Header />

        <Box sx={{
          display: 'flex',
          padding: 3,
          width: '100%',
          height: '100%',
          backgroundColor: 'whitesmoke'
        }}>
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default MainLayout