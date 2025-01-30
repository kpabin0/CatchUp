import React, { useEffect, useState } from 'react'
import { IMatchHighlightView } from '../../data/ITypes';
import { FixtureCard } from '../Fixtures';
import { backendBaseURL } from '../../data/utils';
import Loading from '../../components/Loading';
import BorderDiv from '../../components/BorderDiv';

const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatchHighlightView[]>();
  
  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/matches/highlight`)
                    .then((res) => res.json())
                    .then((data) => { setMatchesData(data); console.log(data); return data; })
                    .catch((error) => { console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="py-3 flex flex-col justify-evenly items-center min-h-screen min-w-full">
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