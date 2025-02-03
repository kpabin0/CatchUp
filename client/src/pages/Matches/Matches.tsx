import React, { useEffect, useState } from 'react'
import { IMatchHighlightView } from '../../data/ITypes';
import { FixtureCard } from '../Fixtures';
import { AxiosGet, checkAdminStatus } from '../../data/utils';
import Loading from '../../components/Loading';
import BorderDiv from '../../components/BorderDiv';
import ThemeLink from '../../components/ThemeLink';
import Message from '../../components/Message';
import { useInfoHandler } from '../../customhook/info';

const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatchHighlightView[]>();
  const isAdmin = checkAdminStatus(); 
  const { info, setInfo } = useInfoHandler()
  
  useEffect(() => {
    AxiosGet(`/matches/highlight`, setMatchesData, setInfo);

  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-3 flex flex-col justify-evenly items-center min-h-screen min-w-full">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
      
      {isAdmin && <span className='absolute top-4 right-4'><ThemeLink label="Add Match" url="/matches/create" /></span>}
      
      <span className="text-3xl text-theme font-bold my-4 uppercase">Matches</span>
      <div className="max-w-[90%] min-w-[60%] flex flex-row justify-evenly items-center flex-wrap text-center my-10">
        {
          matchesData ? matchesData.map((props, ind) => {
            return <FixtureCard key={ind} {...props} />
          }) : <Loading text="matches" />
        }
      </div>
    </section>
  )
}

// later pass the props accordingly
export const MatchCard = ({}) => {
  return (
    <BorderDiv ostyle="bg-theme-w p-2 py-5 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold text-theme uppercase mb-2">t1 vs t2</h3>
      <p className="">fixture date | fixture time</p>
      <p className="text-theme-cont">Venue: venue</p>
    </BorderDiv>
  )
}

export default Matches