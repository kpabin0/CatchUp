import React, { useEffect, useState } from 'react'
import { IPlayer } from '../data/ITypes';
import { Link } from 'react-router-dom';
import { backendBaseURL, getArray } from '../data/utils';
// import Loading from '../components/Loading';
import BasicDiv from '../components/BasicDiv';

const tempArr = getArray(15);
const tempPlayer = {
  playerid: 1, teamid: 1, name: "", role: "", img: "", dob: "", phone: "", address: ""
};

const Players = () => {

  // eslint-disable-next-line
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
      <BasicDiv ostyle="w-full min-h-[40vh] bg-theme text-theme-w">
        <h1 className="text-4xl font-bold">Players</h1>
        <p className="mt-4 text-lg">All the circket player with their basic info and team id</p>
      </BasicDiv>
        {/* <div className="w-[90%] flex flex-row justify-evenly items-center flex-wrap space-x-5 space-y-5 my-20">
            {
                players ? players.map((props, ind) => {
                    return <PlayerCard key={ind} {...props} />
                }) : <Loading text="players" />
            }
        </div> */}
        <div className="w-[90%] grid grid-cols-3 gap-10 my-20">
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
        <Link to={"/players/" + teamid + "/" + playerid} className="min-w-[15rem] my-10 relative flex flex-col justify-evenly items-start space-y-1 border border-theme p-4 rounded-sm hover:bg-theme hover:text-theme-w transition-colors duration-300">
            <img className="mt-[-5rem] w-[10rem] h-[10rem] mb-2 rounded-[50%] bg-theme-g" src={img ? img : "/assets/player.png"} alt={name} />
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