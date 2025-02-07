import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosGet, getArray } from "../../utils/utils";
import { ITournament } from "../../utils/ITypes";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../utils/utils";
import ThemeDiv from "../../components/ThemeDiv";
import { MatchCard } from "../Matches/Matches";
import { useInfoHandler } from "../../customhook/info";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

const tempArr = getArray(5)

const TournamentDetails = () => {
  const { tid } = useParams<{ tid: string }>();
  const isAdmin = checkAdminStatus() 

  const [tournament, setTournament] = useState<ITournament | null>(null);
  const { info, setInfo } = useInfoHandler()

  useEffect(() => {
    AxiosGet(`/tournaments/${tid}`, setTournament, setInfo);
    
  }, []);


  return (
    tournament ?
    <section className="bg-gray-100 min-h-screen">
      <BasicDiv ostyle="min-h-[40vh] bg-theme text-theme-w">
        <h1 className="text-5xl font-bold">{tournament.name}</h1>
        <p className="mt-4 text-lg">Tournament Id: {tournament.tournamentid} | Start: {tournament.start_date.split("T")[0]} | End: {tournament.end_date.split("T")[0]}</p>
      </BasicDiv>
      
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      {isAdmin && <span className='absolute top-4 right-4'><Link className="inline-block bg-theme-w text-theme p-1 px-2 rounded-md hover:scale-105" to={`/tournaments/edit/${tid}`}>Edit Tournament</Link></span>}

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Participating Teams ({tempArr.length})</h2>
          <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tempArr.map((team, index) => (
              <BasicDiv key={index} ostyle="bg-theme-w border hover:border-theme rounded-lg shadow-lg">
                <img src={"#"} alt={"team"} className="w-32 h-32 mx-auto mb-4 bg-theme-g" />
                <h3 className="text-xl font-semibold text-theme-g uppercase">Teamname</h3>
              </BasicDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Results</h2>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {tempArr.map((result, index) => (
              <ThemeDiv key={index} ostyle="bg-theme-w p-6">
                <h3 className="text-xl font-semibold text-theme-g uppercase">Match Result</h3>
                <p className="text-theme-red">Team 1 won/loss Team 2 by ...</p>
              </ThemeDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle=" py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Match Schedule</h2>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {tempArr.map((match, index) => (
              <MatchCard key={index} />
            ))}
          </div>
        </div>
      </BasicDiv>
    </section> : <Loading />
  );
};

export default TournamentDetails;
