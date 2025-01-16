import React, { useEffect, useState } from 'react'
import { getFallbackTournament } from '../data/_tournaments'

interface IMatchStats    {
    day: string,
    runs: number,
    wickets: number,
    fours: number,
    sixes: number,
    extras: number,
    balls: number
};

interface ITournament   {
    name: string,
    start: string,
    end: string,
    venue: string,
    stats: IMatchStats[]
};


const Tournaments = () => {

  const [tournament, setTournament] = useState<ITournament[]>()
  const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/tournament`)
                    .then((res) => res.json())
                    .then((data) => { setTournament(data); console.log(data); return data })
                    .catch((error) => { setTournament(getFallbackTournament()); console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-5 flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <span className="text-3xl text-theme font-bold my-4 uppercase">Tournaments</span>
        <div className="w-[80%] grid grid-cols-2 gap-10 text-center my-10">
          {
            tournament ? tournament?.map(({name, start, end, venue, stats}) => {
              return <TournamentCard name={name} start={start} end={end} venue={venue} stats={stats} />
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}

const TournamentCard = ({name, start, end, venue, stats} : ITournament) => {
  return (
    <div className="border border-theme">
      <h1 className="text-xl font-bold uppercase text-theme-w bg-theme text-center py-2">{name}</h1>
      <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Start Date:</b> {start}</span>
      <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">End Date:</b> {end}</span>
      <hr className="border border-theme" />
      <div className="grid grid-cols-3 gap-6 p-3 px-4">
        {
          stats.map(({day, runs, wickets, fours, sixes, extras, balls}, ind) => {
            return <StatsCard key={ind} day={day} runs={runs} wickets={wickets} fours={fours} sixes={sixes} extras={extras} balls={balls} />
          })
        }
      </div>
    </div>
  )
}

const StatsCard = ({day, runs, wickets, fours, sixes, extras, balls} : IMatchStats) => {
  return (
    <div className="flex flex-col justify-evenly items-start space-y-1">
      <span className="font-bold text-md">Day: {day}</span>
      <span className="text-sm">Runs: {runs}</span>
      <span className="text-sm">Wicket: {wickets}</span>
      <span className="text-sm">Fours: {fours}</span>
      <span className="text-sm">Sixes: {sixes}</span>
      <span className="text-sm">Extras: {extras}</span>
      <span className="text-sm">Balls: {balls}</span>
    </div>
  )
}

export default Tournaments