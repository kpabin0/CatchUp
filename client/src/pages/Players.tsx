import React, { useEffect, useState } from 'react'
import { IPlayer } from '../data/ITypes';
import { Link } from 'react-router-dom';
import { backendBaseURL, getArray } from '../data/utils';
import Loading from '../components/Loading';
import BasicDiv from '../components/BasicDiv';
import { KeyValSpan1 } from '../components/KeyValueSpan';

const tempArr = getArray(15);
const tempPlayer = {
  playerid: 1, 
  teamid: 1, 
  name: "Player", 
  role: "Role", 
  img: "", 
  dob: "1987-8-16", 
  phone: "+977", 
  address: "home"
};

const Players = () => {

  const [players, setPlayers] = useState<IPlayer[]>()

  useEffect(() => {
    const res = async () => {
      return await fetch(backendBaseURL + `/players`)
                    .then((res) => res.json())
                    .then((data) => { setPlayers(data); console.log(data); return data; })
                    .catch((error) => { console.log(error); });
    }
    res();
    
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      <BasicDiv ostyle="w-full min-h-[25vh] bg-theme text-theme-w">
        <h1 className="text-4xl font-bold uppercase">Players</h1>
        <p className="mt-4 text-lg">Total Player Count: {players ? players.length : tempArr.length}</p>
      </BasicDiv>
      <div className="max-w-[90%] grid grid-cols-4 gap-12 my-20">
        {
          tempArr.map((num, ind) => (
            <PlayerCard key={ind} {...tempPlayer} />
          ))
        }
      </div>
    </section>
  )
}

const PlayerCard = ({playerid, teamid, name, role, img, dob, phone, address} : IPlayer) => {
    return (
      <Link to={"/players/" + teamid + "/" + playerid} className="min-w-[15rem] my-10 flex flex-col justify-evenly items-start border-2 p-4 rounded-md hover:border-b-theme hover:-translate-y-2 hover:shadow-md transition-all duration-300">
        <img className="w-[10rem] h-[10rem] mt-[-5rem] mb-2 rounded-[20%] bg-theme-g" src={img ? img : "/assets/player.png"} alt={name} />
        <KeyValSpan1 k={"Name"} v={name} sep=':' />
        <KeyValSpan1 k={"Role"} v={role} sep=':' />
        <span className="text-sm">Player number: {playerid}</span>
        <span className="text-sm">Team id: {teamid}</span>
        <span className="text-sm">DOB: {dob}</span>
        <span className="text-sm">Phone: {phone}</span>
        <span className="text-sm">Address: {address}</span>
      </Link>
    )
}

export default Players