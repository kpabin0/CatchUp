import React, { useEffect, useState } from 'react'
import { getFallbackMatches } from '../../data/_matches'
import { IMatchHighlightView } from '../../data/ITypes';
import { FixtureCard } from '../Fixtures';
import { backendBaseURL } from '../../data/utils';

const Matches = () => {

  const [matchesData, setMatchesData] = useState<IMatchHighlightView[]>();
  
  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/matches`)
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
              return <FixtureCard key={ind} {...props} />
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}


export default Matches