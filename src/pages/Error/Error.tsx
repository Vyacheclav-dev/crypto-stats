import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Typography } from '@mui/material'
import { Routes } from '../../router/routes'
import Report from '@mui/icons-material/Report'

const Error: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  return (
    <Box sx={{
      width: '100%',
      margin: 'auto 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <Report sx={{
        fontSize: isSmallScreen ? 64 : 96,
        color: 'error.main'
      }} />

      <Typography
        variant={isSmallScreen ? 'h5' : 'h3'}>
        {location.state?.message || 'Oops...'}
      </Typography>

      <Typography
        variant='h6'
        onClick={() => navigate(`../${Routes.HOME}`, { replace: true })}
        sx={{
          fontSize: isSmallScreen ? 14 : 18,
          color: 'secondary.light',
          cursor: 'pointer'
        }}
      >
        GO TO THE HOME PAGE
      </Typography>
    </Box>
  )
}

export default Error