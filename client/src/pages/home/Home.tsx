import React, { FC } from 'react'
import { useGetAssetsQuery } from '../../services/cryptoApi'

const Home: FC = () => {
  const { data, isFetching } = useGetAssetsQuery('')

  if (isFetching) return <div>Loading...</div>

  console.log(data)


  return (
    <div>
      <h1>HOME PAGE</h1>
    </div>
  )
}

export default Home