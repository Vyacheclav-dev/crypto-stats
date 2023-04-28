import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'


interface BackdropSpinnerProps {
  isOpen: boolean
}

const BackdropSpinner = (props: BackdropSpinnerProps) => {

  return (
    <Backdrop open={props.isOpen}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackdropSpinner
