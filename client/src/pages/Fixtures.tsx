import React, { useEffect, useState } from 'react'
import { IFixture } from '../data/ITypes';
import { getFallbackFixtures } from '../data/_fixtures';

const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

const Fixtures = () => {

  const [fixtureData, setFixtureData] = useState<IFixture[]>();

  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/matches`)
                    .then((res) => res.json())
                    .then((data) => { setFixtureData(data); console.log(data); return data })
                    .catch((error) => { setFixtureData(getFallbackFixtures()); console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      <span className="text-3xl text-theme font-bold my-4 uppercase">Fixtures</span>
      <div className="max-w-[90%] min-w-[60%] grid grid-cols-2 gap-5 text-center my-10">
        {
          fixtureData ? fixtureData.map((props, ind) => {
            return <FixtureCard key={ind} {...props} />
          }) : <span className="text-3xl text-theme ">Loading...</span>
        }
      </div>
      
    </section>
  )
}

export const FixtureCard = ({team_1, team_2, isLive, date} : IFixture) => {
  return (
    <div className="w-full min-h-[10rem] p-2 relative flex flex-col justify-between items-center border border-theme hover:shadow-xl hover:-translate-y-1 rounded-sm transition-all duration-200">
      { isLive ? <span className="absolute font-bold bottom-1 right-2 text-theme-cont animate-pulse">Live</span> : <></>}
      <div className="w-full grid-cols-3">
        <div className="w-full grid grid-cols-2 gap-6">
          <span className="text-xl uppercase font-main-a font-extrabold inline-block text-theme">{team_1.name}</span>
          <span className="text-xl uppercase font-main-a font-extrabold inline-block text-theme">{team_2.name}</span>
        </div>
        <span className="w-full text-xl block uppercase">Vs</span>
        <div className="w-full grid grid-cols-2 gap-6">
          <span className="text-3xl tracking-tighter font-extrabold">{team_1.runs} / {team_1.wickets} ({team_1.over})</span>
          <span className="text-3xl tracking-tighter font-extrabold">{team_2.runs} /3{team_2.wickets} ({team_2.over})</span>
        </div>
      </div>
      {date ? <span className="text-sm tracking-tighter font-light">{date}</span> : <></>}
    </div>
  )
}

export default Fixtures