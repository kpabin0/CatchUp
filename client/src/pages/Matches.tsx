import React, { useEffect, useState } from 'react'
import { getFallbackMatches } from '../data/_matches'
import { IMatch } from '../data/ITypes';


const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatch[]>();
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
            matchesData ? matchesData?.map((props, ind) => {
              return <MatchesCard key={ind} {...props} />
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}


const MatchesCard = ({matchid, tournamentid, teamid_1, teamid_2, extras_1, extras_2, venueid} : IMatch) => {
  return (
    <div className="w-full min-h-[10rem] p-2 relative flex flex-col justify-between items-center border border-theme hover:shadow-xl hover:-translate-y-1 rounded-sm transition-all duration-200">
      { matchid % 2 === 0 ? <span className="absolute font-bold top-1 right-2 text-theme-cont">Live</span> : <></>}
      <div className="w-full grid-cols-3">
        <div className="w-full grid grid-cols-2 gap-6">
          <span className="text-xl uppercase font-main-a font-extrabold inline-block text-theme">Team {teamid_1}</span>
          <span className="text-xl uppercase font-main-a font-extrabold inline-block text-theme">Team {teamid_2}</span>
        </div>
        <span className="w-full text-xl block uppercase">Vs</span>
        <div className="w-full grid grid-cols-2 gap-6">
          <span className="text-2xl tracking-tighter font-bold">Runs/Wicket (Over.Over)</span>
          <span className="text-2xl tracking-tighter font-bold">Runs/Wicket (Over.Over)</span>
        </div>
      </div>
      <span className="w-full text-sm block">Venue: {venueid}</span>
    </div>
  )
}

export default Matches