import React, { useEffect, useState } from 'react'
import { IMatchHighlightView } from '../../data/ITypes';
import { backendBaseURL, getArray } from '../../data/utils';
import Loading from '../../components/Loading';
import BorderDiv from '../../components/BorderDiv';

const tempArr = getArray(5);

const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatchHighlightView[]>();
  
  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/matches`)
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
        <div className="w-[80%] grid grid-cols-2 gap-10">
          {
            tempArr.map((num, ind) => {
              return <MatchCard key={ind} />
            })
          }
        </div>
    </section>
  )
}

// later pass the props accordingly
export const MatchCard = ({}) => {
  return (
    <BorderDiv ostyle="bg-theme-w p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-theme uppercase mb-2">team1 vs team2</h3>
      <p className="">fixture date | fixture time</p>
      <p className="text-theme-cont">Venue: venue</p>
    </BorderDiv>
  )
}


export default Matches