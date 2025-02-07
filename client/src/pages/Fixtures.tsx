import React, { useEffect, useState } from 'react'
import { IFixture } from '../utils/ITypes';
import { AxiosGet } from '../utils/utils';
import Loading from '../components/Loading';
import { useInfoHandler } from '../customhook/info';
import Message from '../components/Message';
import BasicDiv from '../components/BasicDiv';

const Fixtures = () => {

  const [fixtureData, setFixtureData] = useState<IFixture[]>();
  const { info, setInfo } = useInfoHandler();

  useEffect(() => {
    AxiosGet(`/matches/highlight`, setFixtureData, setInfo);
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      
      <span className="text-3xl text-theme font-bold my-4 uppercase">Fixtures</span>
      <div className="max-w-[90%] min-w-[60%] flex flex-row flex-wrap justify-evenly items-center text-center">
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
    <BasicDiv ostyle="border-2 hover:border-theme-cont bg-theme-w-alt rounded-md min-h-[10rem] py-5 relative cursor-pointer ">
      { isLive ? <span className="absolute font-bold bottom-1 right-2 text-sm text-theme-red animate-pulse">Live</span> : <></>}
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
    </BasicDiv>
  )
}

export default Fixtures