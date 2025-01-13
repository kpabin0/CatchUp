import { useEffect, useState } from 'react'
import ThemeLink from '../components/ThemeLink'

const Landing = () => {

  const _tournamentNames = ["Nepal Premier League", "T20", "Another Tournament"];
  const [textCount, setTextCount] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentTournament, setcurrentTournament] = useState<string>("");

  useEffect(()=>  {
    let textC = 0, activeInd = 0;
    setInterval(() => {
      textC++;
      if(textC > _tournamentNames[activeInd].length)
      {
        activeInd = (activeInd+1) % _tournamentNames.length;
        textC = 0;
      }

      setTextCount(textC);
      setActiveIndex(activeInd);
    }, 5000/_tournamentNames[activeInd].length);

    // eslint-disable-next-line
  },[])

  useEffect(()=> {
    setcurrentTournament(_tournamentNames[activeIndex].substring(0, textCount) + "_");
    // eslint-disable-next-line
  },[textCount])

  return (
    <section className="relative min-h-screen min-w-full flex flex-col justify-evenly items-center text-center">
      <div>
        <h1 className="font-main-a text-8xl my-10 font-bold uppercase text-theme">Catchup</h1>
        <h1 className="font-main-a text-5xl font-bold uppercase text-theme-w">{currentTournament}</h1>
      </div>
      <ThemeLink label="Explore" url="/home" />
    </section>
  )
}

export default Landing;