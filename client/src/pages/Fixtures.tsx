import React, { useEffect, useState } from 'react'
import { IFixture } from '../data/ITypes';
import { backendBaseURL } from '../data/utils';
import BorderDiv from '../components/BorderDiv';
import Loading from '../components/Loading';

const Fixtures = () => {

  const [fixtureData, setFixtureData] = useState<IFixture[]>();

  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/matches/highlight`)
                    .then((res) => res.json())
                    .then((data) => { setFixtureData(data); console.log(data); return data; })
                    .catch((error) => { console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      <span className="text-3xl text-theme font-bold my-4 uppercase">Fixtures</span>
      <div className="max-w-[90%] min-w-[60%] flex flex-row flex-wrap justify-evenly items-center">
        {
          fixtureData ? fixtureData.map((props, ind) => {
            return <FixtureCard key={ind} {...props} />
          }) : <Loading text="Fixtures" />
        }
      </div>
      
    </section>
  )
}

export const FixtureCard = ({team_1, team_2, isLive, date} : IFixture) => {
  const teams = [team_1, team_2]
  return (
    <BorderDiv ostyle="min-h-[10rem] bg-theme-w p-2 py-5 rounded-lg shadow-lg text-center relative">
      { isLive ? <span className="absolute font-bold bottom-1 right-2 text-sm text-theme-cont animate-pulse">Live</span> : <></>}
      <span>vs</span>
      <div className="grid grid-cols-2 gap-10">
        {teams.map((t, ind) => {
          return <div key={ind}>
                    <h1 className='text-theme uppercase font-bold'>{t.name}</h1>
                    <span className="text-3xl tracking-tighter font-extrabold">{t.runs} / {t.wickets} ({t.over})</span>
                </div>
        })}
      </div>
      {date ? <span className="text-sm tracking-tighter font-light">{date}</span> : <></>}
    </BorderDiv>
  )
}

export default Fixtures