import React, { FC, useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Routes } from '../../router/routes'

const ErrorBoundary: FC = () => {
  const error: {status?: number} = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error?.status === 404) {
        navigate(Routes.ERROR, { state: { message: 'This page does not exist!' } })
      }

      if (error?.status === 500) {
        navigate(Routes.ERROR, { state: { message: 'Server error' } })
      }

      if (error?.status === 503) {
        navigate(Routes.ERROR, { state: { message: 'Looks like our API is down' } })
      }

      navigate(Routes.ERROR, { state: { message: 'Something went wrong...' } })
    }
  }, [error?.status])


  return null
}

export default ErrorBoundary