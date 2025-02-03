import { useEffect, useState } from 'react'
import ThemeLink from '../components/ThemeLink'
import BasicDiv from '../components/BasicDiv';
import { AxiosGet } from '../utils/utils';
import { useInfoHandler } from '../customhook/info';

const Landing = () => {

  const [tournaments, setTournament] = useState<string[]>([]);
  const [textCount, setTextCount] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentTournament, setCurrentTournament] = useState<string>("");

  const { info, setInfo } = useInfoHandler();

  useEffect(() => {
    // currently this is hardcoded and not typesafe
    const forwardSetTournament = (d: any) => {
      const _tournaments: string[] = []
      d.forEach((i: any) => { _tournaments.push(i.name)})
      // console.log(_tournaments)
      setTournament(_tournaments);
    }

    // this is fallback incase fetch failed;
    setTournament(["Nepal Premier League", "Elite Cup", "Jay Nepal Cup"]);
    AxiosGet(`/tournaments`, forwardSetTournament, setInfo);
    // console.log(info);
  }, [])
  
  useEffect(() => {
    if(tournaments.length === 0) return;
    console.log(tournaments);
    let textC = 0, activeInd = 0;
    const interval = setInterval(() => {
      textC++;
      if(textC > tournaments[activeInd].length)
      {
        activeInd = (activeInd+1) % tournaments.length;
        textC = 0;
      }

      setTextCount(textC);
      setActiveIndex(activeInd);
    }, 5000/tournaments[activeInd].length);

    return () => clearInterval(interval)
    
    // eslint-disable-next-line
  }, [tournaments])

  useEffect(()=> {
    setCurrentTournament(tournaments[activeIndex] || "Loading")

    // eslint-disable-next-line
  },[activeIndex])


  return (
    <section className="relative min-h-screen min-w-full flex flex-col justify-evenly items-center text-center">
      <BasicDiv>
        <h1 className="font-main-a text-8xl my-10 font-bold uppercase text-theme">Catchup</h1>
        <h1 className="font-main-a text-5xl font-bold uppercase text-theme-w">{currentTournament?.substring(0, textCount) + "_"}</h1>
      </BasicDiv>
      <span><ThemeLink label="Explore" url="/home" /></span>
    </section>
  )
}

export default Landing;