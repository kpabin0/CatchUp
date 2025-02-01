import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ThemeDiv from '../../components/ThemeDiv';
import BasicDiv from '../../components/BasicDiv';
import { IPlayer } from '../../data/ITypes';
import { backendBaseURL } from '../../data/utils';

const Player = () => {

    const { tid, pid } = useParams();

    const [player, setPlayer] = useState<IPlayer>()

    useEffect(() => {
      const res = async () => {
        await axios.get(backendBaseURL + `/players/${pid}`)
                      .then((res) => { setPlayer(res.data); console.log(res.data); return res.data; })
                      .catch((error) => { console.log(error); });
      }
      res();
      
    // eslint-disable-next-line
    }, [])

  return (
    <section className="min-h-screen min-w-full flex flex-row justify-evenly items-center relative">
        <ThemeDiv className="w-[30rem] h-[30rem] bg-theme rounded-md">
          <img src={"/assets/player.png"} alt={"img"} />
        </ThemeDiv>
        <BasicDiv ostyle="space-y-2 uppercase text-left">
          <h1 className="font-bold text-3xl text-theme">{player?.name}</h1>
          <span className="block">Team: {tid}</span>
          <span className="block">Player Number: {pid}</span>
        </BasicDiv>
    </section>
  )
}

export default Player