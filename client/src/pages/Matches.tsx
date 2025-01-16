import React, { useEffect, useState } from 'react'
import { getFallbackMatches } from '../data/_matches'

interface IMatchStats
{
  runs: number,
  wickets: number,
  fours: number,
  sixes: number,
  extras: number,
  balls: number
};

interface IMatches
{
  date: string,
  time: string,
  venue: string,
  stats: IMatchStats[]
};


const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatches[]>();
  const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;
  
  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/matches`)
                    .then((res) => res.json())
                    .then((data) => { setMatchesData(data); console.log(data); return data })
                    .catch((error) => { setMatchesData(getFallbackMatches()); console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-3 flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <span className="text-3xl text-theme font-bold my-4 uppercase">Matches</span>
        <div className="max-w-[90%] min-w-[60%] grid grid-cols-2 gap-10 text-center my-10">
          {
            matchesData ? matchesData?.map(({date, time, venue, stats}) => {
              return <MatchesCard date={date} time={time} venue={venue} stats={stats} />
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}


const MatchesCard = ({date, time, venue, stats} : IMatches) => {
  return (
    <div className="border border-theme ">
      <h1 className="text-lg font-bold uppercase text-theme-w bg-theme text-center py-2">{date} <b className="text-sm font-light normal-case">(Time: {time} pm, {venue})</b></h1>
      <div className="grid grid-cols-3 gap-6 p-3 px-4">
        {
          stats.map(({runs, wickets, fours, sixes, extras, balls}, ind) => {
            return <StatsCard key={ind} runs={runs} wickets={wickets} fours={fours} sixes={sixes} extras={extras} balls={balls} />
          })
        }
      </div>
    </div>
  )
}

const StatsCard = ({runs, wickets, fours, sixes, extras, balls} : IMatchStats) => {
  return (
    <div className="flex flex-col justify-evenly items-start space-y-1">
      <span className="text-sm">Runs: {runs}</span>
      <span className="text-sm">Wicket: {wickets}</span>
      <span className="text-sm">Fours: {fours}</span>
      <span className="text-sm">Sixes: {sixes}</span>
      <span className="text-sm">Extras: {extras}</span>
      <span className="text-sm">Balls: {balls}</span>
    </div>
  )
}

export default Matches