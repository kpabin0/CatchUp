import React from 'react'
import { useParams } from 'react-router-dom'

const Player = () => {

    const { id } = useParams();

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        Player : {id}
    </section>
  )
}

export default Player