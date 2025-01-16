import React, { useEffect, useState } from 'react'
import { getFallbackPlayers } from '../data/_players'

interface IPlayers
{
    name: string,
    img: string,
    role: string,
    runs: number,
    wickets: number,
    fours: number,
    sixes: number,
    ballsFaced: number
};

const Players = () => {

  const [players, setPlayers] = useState<IPlayers[]>()
  const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

  useEffect(() => {
    const res = async () => {
      return await fetch(`http://localhost:${PORT_NUMBER}/players`)
                    .then((res) => res.json())
                    .then((data) => { setPlayers(data); console.log(data); return data })
                    .catch((error) => { setPlayers(getFallbackPlayers()); console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1 className="font-bold text-3xl text-theme my-2">Players</h1>
        <div className="grid grid-cols-3 gap-20 my-20">
            {
                players?.map(({name, img, role, runs, wickets, fours, sixes, ballsFaced}) => {
                    return <PlayerCard name={name} img={img} role={role} runs={runs} wickets={wickets} fours={fours} sixes={sixes} ballsFaced={ballsFaced} />
                })
            }
        </div>
    </section>
  )
}

const PlayerCard = ({name, img, role, runs, wickets, fours, sixes, ballsFaced} : IPlayers) => {
    return (
        <div className="min-w-[20rem] relative flex flex-col justify-evenly items-center space-y-1 border border-theme p-4 rounded-sm hover:bg-theme hover:text-theme-w transition-colors duration-300">
            <img className="mt-[-5rem] w-[10rem] h-[10rem] mb-4" src={img} alt={name} />
            <span className="font-bold text-md">Name: {name}</span>
            <span className="font-bold text-md">Role: {role}</span>
            <span className="text-sm">Runs: {runs}</span>
            <span className="text-sm">Wicket: {wickets}</span>
            <span className="text-sm">Fours: {fours}</span>
            <span className="text-sm">Sixes: {sixes}</span>
            <span className="text-sm">Balls: {ballsFaced}</span>
        </div>
    )
}

export default Players