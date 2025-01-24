import React, { useEffect, useState } from 'react'
import { getFallbackPlayers } from '../data/_players'
import { IPlayer } from '../data/ITypes';
import { Link } from 'react-router-dom';
import { backendBaseURL } from '../data/utils';

const Players = () => {

  const [players, setPlayers] = useState<IPlayer[]>()

  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/players`)
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
        <div className="grid xl:grid-cols-3 grid-cols-2 gap-y-20 gap-x-5 my-20">
            {
                players?.map((props, ind) => {
                    return <PlayerCard key={ind} {...props} />
                })
            }
        </div>
    </section>
  )
}

const PlayerCard = ({playerid, teamid, name, role, img, dob, phone, address} : IPlayer) => {
    return (
        <Link to={"/players/" + teamid + "/" + playerid} className="min-w-[20rem] relative flex flex-col justify-evenly items-center space-y-1 border border-theme p-4 rounded-sm hover:bg-theme hover:text-theme-w transition-colors duration-300">
            <img className="mt-[-5rem] w-[10rem] h-[10rem] mb-4 rounded-[50%]" src={img} alt={name} />
            <span className="font-bold text-md">Name: {name}</span>
            <span className="font-bold text-md">Role: {role}</span>
            <span className="text-sm">Player number: {playerid}</span>
            <span className="text-sm">Team id: {teamid}</span>
            <span className="text-sm">DOB: {dob}</span>
            <span className="text-sm">Phone: {phone}</span>
            <span className="text-sm">Address: {address}</span>
        </Link>
    )
}

export default Players