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
    <section className="relative h-screen min-w-full flex flex-col justify-evenly items-center font-f6 text-left">
      <BasicDiv ostyle="text-theme-w w-full px-[10%] flex flex-col justify-evenly ">
        <div className="w-full text-5xl/snug font-bold flex flex-col">
          <p>Love to watch <span className='text-theme font-extrabold'>Cricket</span>?</p>
          <span className="w-full block">Don't worry now!</span>
        </div>
        <p className="w-full font-medium my-2 mb-5 text-sm">Catchup is here to gives the latest and greatest live updates never been before</p>
        <h1 className="w-full my-8 text-3xl font-bold uppercase text-theme capitalize">{currentTournament?.substring(0, textCount) + "_"}</h1>
        <ThemeLink label="Home" url="/home" ostyle="self-start my-5" />
      </BasicDiv>
    </section>
  )
}

export default Landing;