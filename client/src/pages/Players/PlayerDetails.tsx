import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ThemeDiv from '../../components/ThemeDiv';
import BasicDiv from '../../components/BasicDiv';
import { IPlayer } from '../../utils/ITypes';
import { AxiosGet } from '../../utils/utils';
import { useInfoHandler } from '../../customhook/info';
import Message from '../../components/Message';

const Player = () => {

    const { tid, pid } = useParams();

    const [player, setPlayer] = useState<IPlayer>()
    const { info, setInfo } = useInfoHandler()

    useEffect(() => {
      AxiosGet(`/players/${pid}`, setPlayer, setInfo);
      
    // eslint-disable-next-line
    }, [])

  return (
    <section className="min-h-screen min-w-full flex sm:flex-row flex-col justify-evenly items-center relative">
       
        <ThemeDiv className="w-[30rem] h-[30rem]">
          <img src={"/assets/player.png"} alt={"img"} />
        </ThemeDiv>
        <BasicDiv ostyle="space-y-2 uppercase text-left">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
          <h1 className="font-bold text-3xl text-theme">{player?.name}</h1>
          <span className="block">Team: {tid}</span>
          <span className="block">Player Number: {pid}</span>
        </BasicDiv>
    </section>
  )
}

export default Player