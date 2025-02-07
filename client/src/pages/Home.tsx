import { useEffect, useState } from "react";
import BasicDiv from "../components/BasicDiv";
import { IMatchHighlightView, ITournament } from "../utils/ITypes";
import { AxiosGet } from "../utils/utils";
import FullBgCover from "../components/FullBgCover";
import ThemeLink from "../components/ThemeLink";
import { Link } from "react-router-dom";
import { FixtureCard } from "./Fixtures";
import Loading from "../components/Loading";
import { useInfoHandler } from "../customhook/info";
// import Message from "../components/Message";

const Home = () => {

  const [topPlayer, setTopPlayer] = useState<IPlayerCard[]>();
  const [topMatches, setTopMatches] = useState<IMatchHighlightView[]>();
  const [topTournaments, setTopTournaments] = useState<ITournament[]>();
  const { info, setInfo } = useInfoHandler();

  useEffect(() => {
    AxiosGet(`/matches/hot`, setTopMatches, setInfo);
    AxiosGet(`/players/top`, setTopPlayer, setInfo);
    AxiosGet(`/tournaments/hot`, setTopTournaments, setInfo);

  // eslint-disable-next-line
  }, [])

  return (
    <section className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      <FullBgCover />

      {/* {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> } */}

      <BasicDiv ostyle="w-full py-12 min-h-[50vh]">
          <h2 className="p-2 mb-10 text-xl font-bold bg-theme text-theme-w inline-block rounded-md">Fixtures</h2>
          <div className="w-[90%] flex flex-row justify-evenly items-center flex-wrap md:flex-nowrap md:space-x-5">
            {topMatches ? topMatches.map((fixture, index) => (
              <FixtureCard key={index} {...fixture} />
            )) : <Loading />}
          </div>
      </BasicDiv>
      <hr className="w-[50%] mx-auto border border-theme-w" />

      <BasicDiv ostyle="w-full min-h-[50vh]">
        <h2 className="p-2 mb-6 text-xl font-bold bg-theme text-theme-w inline-block rounded-md">Top Players</h2>
        <div className="w-[80%] flex flex-row flex-wrap justify-evenly items-center">
          {topPlayer ? topPlayer.map((player, index) => (
            <PlayerCard key={index} {...player} />
          )) : <Loading />}
        </div>
      </BasicDiv>

      <BasicDiv ostyle="w-full min-h-[50vh]">
        <h2 className="text-3xl font-bold text-theme mb-8 uppercase">Tournaments</h2>
        <div className="w-[80%] grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topTournaments ? topTournaments.map((tour, index) => (
            <TournamentCard key={index} {...tour} />
          )) : <Loading />}
        </div>
      </BasicDiv>

      <div className="min-h-[20vh] flex flex-col items-center justify-center text-center text-theme-w">
        <p className="text-lg block text-black">Get the latest <Link to={"/news"} className="hover:underline" >news</Link>, <Link to={"/fixtures"} className="hover:underline">fixtures</Link> and updates about circket world</p>
      </div>
    </section>
  );
}

interface IPlayerCard {
  playerid: number,
  teamid: number,
  name: string
};

export const PlayerCard = ({playerid, teamid, name} : IPlayerCard) => {
  return (
    <BasicDiv ostyle="border-2 min-w-[20rem] border bg-theme-w p-4 rounded-lg  text-theme-g-alt my-2">
      <img src={"#"} alt={"player"} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
      <h3 className="text-xl text-theme font-semibold uppercase">{name}</h3>
      <h3 className="text-sm font-semibold uppercase">Teamid: {teamid}</h3>
      <p className="text-sm">Playerid: {playerid}</p>
    </BasicDiv>
  )
}

export const TournamentCard = ({tournamentid, name, start_date, end_date} : ITournament) => {
  return (
    <BasicDiv ostyle="bg-theme-w py-6 rounded-lg shadow-lg border hover:border-theme">
      <h3 className="my-5 text-xl font-semibold text-theme-g-alt uppercase">{name}</h3>
      <span>Start: {start_date.split("T")[0]} | End: {end_date.split("T")[0]}</span>
      <ThemeLink ostyle="self-end mt-5" url={`/tournaments/${tournamentid}`} label="Learn More" />
    </BasicDiv>
  )
}

export default Home;
