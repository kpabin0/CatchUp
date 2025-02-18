import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThemeDiv from '../../components/ThemeDiv';
import BasicDiv from '../../components/BasicDiv';
import { IPlayerStats } from '../../utils/ITypes'; 
import { AxiosGet } from '../../utils/utils';
import { useInfoHandler } from '../../customhook/info';
import Message from '../../components/Message';

const PlayerStatsDetail = () => {
  const params = useParams();
  console.log("useParams output:", params);

  const playerid = params.playerid;
  const matchid = params.matchis; 

  const [playerStats, setPlayerStats] = useState<IPlayerStats>();
  const { info, setInfo } = useInfoHandler();

  useEffect(() => {
    if (playerid && matchid) {
      console.log("Player and match id ", playerid, matchid);
      AxiosGet(`/playerstatus/${playerid}/${matchid}`, (data: any) => {
        console.log("Fetched Player Stats:", data);
        setPlayerStats(data);
      }, setInfo);
    } else {
      console.log("Player and match id not found");
    }
  }, [playerid, matchid]);

  return (
    <section className="min-h-screen min-w-full flex sm:flex-row flex-col justify-evenly items-center relative">
      <ThemeDiv className="w-[30rem] h-[30rem]">
             <img src={"/assets/player.png"} alt={"Player Stats"} />
             </ThemeDiv>
      <BasicDiv ostyle="space-y-2 uppercase text-left">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <h1 className="font-bold text-3xl text-theme">{playerStats?.playerid || "Fallback Player"}</h1>
        <span className="block">Match ID: {matchid}</span>
        <span className="block">Balls Played: {playerStats?.balls_played || "N/A"}</span>
        <span className="block">Balls Bowled: {playerStats?.balls_bowled || "N/A"}</span>
        <span className="block">Runs Scored: {playerStats?.runs || "N/A"}</span>
        <span className="block">Runs Conceived: {playerStats?.runs_concieved || "N/A"}</span>
        <span className="block">Wickets: {playerStats?.wickets || "N/A"}</span>
        <span className="block">Sixes: {playerStats?.sixes || "N/A"}</span>
        <span className="block">Fours: {playerStats?.fours || "N/A"}</span>
      </BasicDiv>
    </section>
  );
};


export default PlayerStatsDetail;
