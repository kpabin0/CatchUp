import { useEffect, useState } from 'react'
import ThemeLink from '../components/ThemeLink'

const Landing = () => {

  useEffect(() => {
    setInterval(() => {

    }, 1000)
  }, [])

  const _mainText = "Nepal Premier League";
  const [textCount, setTextCount] = useState<number>(-1);
  const [mainText, setMainText] = useState<string>("")

  useEffect(()=>
  {
    let num = 0;
    setInterval(() =>
    {
      setTextCount(num);
      num++;
      num %= _mainText.length;
      // console.log("Value " + mainText + " Count " + textCount);
    }, 300);
  },[])

  useEffect(()=>
  {
    setMainText(_mainText.substring(0, textCount+1)+(_mainText.substring(0, textCount+1)===_mainText?"":"_"));
  },[textCount])

  return (
    <section className="relative min-h-screen min-w-full flex flex-col justify-evenly items-center text-center">
      <div>
        <h1 className="font-main-a text-8xl my-10 font-bold uppercase text-theme">Catchup</h1>
        <h1 className="font-main-a text-5xl font-bold uppercase text-theme-w">{mainText}</h1>
      </div>
      <ThemeLink label="Explore" url="/home" />
    </section>
  )
}

export default Landing;