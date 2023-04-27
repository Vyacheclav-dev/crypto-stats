import React, { FC } from 'react'
import { Box } from '@mui/material'


const Footer: FC = () => {
  return (
    <Box sx={{
      width: '100%',
      height: 100,
      textAlign: 'center',
      paddingLeft: { md: '300px' },
      backgroundColor: 'primary.main',
      color: 'common.white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h4 style={{ marginBottom: 0 }}>Cryptostats</h4>
      <h5 style={{ marginTop: 0 }}>All rights reserved</h5>
    </Box>
  )
}

export default Footer