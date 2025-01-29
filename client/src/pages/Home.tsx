import { useEffect, useState } from "react";
import BasicDiv from "../components/BasicDiv";
import { IMatchView, IPlayer, ITournament } from "../data/ITypes";
import { backendBaseURL, getArray } from "../data/utils";
import FullBgCover from "../components/FullBgCover";
import ThemeLink from "../components/ThemeLink";
import { FixtureCard } from "./Fixtures";
import { MatchCard } from "./Matches/Matches";
import { Link } from "react-router-dom";

const tempArr = getArray(4);

const Home = () => {

  const [topPlayer, setTopPlayer] = useState<IPlayer | null>(null);
  const [topMatches, setTopMatches] = useState<IMatchView | null>(null);
  const [topTournaments, setTopTournaments] = useState<ITournament | null>(null);

  useEffect(() => {
    fetchPlayer();
    fetchCurrentMatches();
    fetchHotTournaments();

  }, [])

  const fetchPlayer = async () => {
    await fetch(backendBaseURL + "/players/top")
            .then((res) => res.json())
            .then(data => setTopPlayer(data))
            .catch(error => console.log(error))
  }

  const fetchCurrentMatches = async () => {
    await fetch(backendBaseURL + "/matches/hot")
            .then((res) => res.json())
            .then(data => setTopMatches(data))
            .catch(error => console.log(error))
  }

  const fetchHotTournaments = async () => {
    await fetch(backendBaseURL + "/tournaments/hot")
            .then((res) => res.json())
            .then(data => setTopTournaments(data))
            .catch(error => console.log(error))
  }

  return (
    <section className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      
      <FullBgCover />

      <BasicDiv ostyle="w-full py-12">
          <h2 className="p-2 mb-10 text-xl font-bold bg-theme text-theme-w inline-block">Upcoming Fixtures</h2>
          <div className="w-[80%] grid grid-cols-4 gap-10">
            {tempArr.map((fixture, index) => (
              <MatchCard key={index} />
            ))}
          </div>
      </BasicDiv>
      <hr className="w-[50%] mx-auto border border-theme-w" />

      <BasicDiv ostyle="w-full min-h-[50vh]">
        <h2 className="p-2 mb-6 text-xl font-bold bg-theme text-theme-w inline-block">Top Player</h2>
        <div className="w-[80%] grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tempArr.map((player, index) => (
            <BasicDiv key={index} ostyle="border bg-theme-w p-4 rounded-lg">
              <img src={"#"} alt={"player"} className="w-32 h-32 mx-auto bg-theme-g rounded-full object-cover mb-4" />
              <h3 className="text-xl font-semibold text-theme-g-alt uppercase">playername</h3>
              <h3 className="text-xl font-semibold text-theme-g-alt uppercase">Team</h3>
              <p className="text-theme-g">playerrole</p>
            </BasicDiv>
          ))}
        </div>
      </BasicDiv>

      <BasicDiv ostyle="w-full min-h-[50vh]">
        <h2 className="text-3xl font-bold text-theme mb-8 uppercase">Tournaments</h2>
        <div className="w-[80%] grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tempArr.map((tour, index) => (
            <BasicDiv key={index} ostyle="bg-theme-w py-6 rounded-lg shadow-lg border hover:border-theme">
              <h3 className="my-5 text-xl font-semibold text-theme-g-alt uppercase">Tournament Name</h3>
              <ThemeLink ostyle="self-end" url={`/tournaments/${index}`} label="Learn More" />
            </BasicDiv>
          ))}
        </div>
      </BasicDiv>

      <div className="min-h-[20vh] flex flex-col items-center justify-center text-center text-theme-w">
        <p className="text-lg block text-black">Get the latest <Link to={"/news"} className="hover:underline" >news</Link>, <Link to={"/fixtures"} className="hover:underline">fixtures</Link> and updates about circket world</p>
      </div>
    </section>
  );
}

export default Home;
