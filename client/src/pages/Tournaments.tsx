import React, { useEffect, useState } from 'react'

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

  const [tournament, SetTournament] = useState<ITournament[]>()
  const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/tournament`)
                    .then((res) => res.json())
                    .then((data) => { SetTournament(data); console.log(data); return data })
                    .catch((error) => { console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-20 flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <span className="text-3xl text-theme font-bold my-4">Tournaments</span>
        <div className="w-[80%] grid grid-cols-1 gap-10 text-center ">
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
      <span className="font-extralight text-md text-center block my-2">Start Date: {start}</span>
      <span className="font-extralight text-md text-center block my-2">End Date: {end}</span>
      <div className="grid grid-cols-3 gap-6">
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
    <div className="flex flex-col justify-evenly items-start p-2">
      <span>Day: {day}</span>
      <span>Runs: {runs}</span>
      <span>Wicket: {wickets}</span>
      <span>Fours: {fours}</span>
      <span>Sixes: {sixes}</span>
      <span>Extras: {extras}</span>
      <span>Balls: {balls}</span>
    </div>
  )
}

export default Tournaments