import React, { useEffect, useState } from 'react'
import { getFallbackTournaments } from '../data/_tournaments'
import { ITournament } from '../data/ITypes';

const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

const Tournaments = () => {

  const [tournament, setTournament] = useState<ITournament[]>()

  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/tournament`)
                    .then((res) => res.json())
                    .then((data) => { setTournament(data); console.log(data); return data })
                    .catch((error) => { setTournament(getFallbackTournaments()); console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-5 flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <span className="text-3xl text-theme font-bold my-4 uppercase">Tournaments</span>
        <div className="w-[80%] grid grid-cols-2 gap-10 text-center my-10">
          {
            tournament ? tournament?.map((props) => {
              return <TournamentCard {...props} />
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}

const TournamentCard = ({tournamentid, name, start, end} : ITournament) => {
  return (
    <div className="border border-theme">
      <h1 className="text-xl font-bold uppercase text-theme-w bg-theme text-center py-2">{name}</h1>
      <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Start Date:</b> {start}</span>
      <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">End Date:</b> {end}</span>
      <hr className="border border-theme" />
    </div>
  )
}

export default Tournaments