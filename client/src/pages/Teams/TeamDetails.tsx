import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendBaseURL, getArray } from "../../data/utils";
import { ITeam } from "../../data/ITypes";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../data/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import ThemeDiv from "../../components/ThemeDiv";
import { MatchCard } from "../Matches/Matches";
// import ThemeLink from "../../components/ThemeLink";

const tempArr = getArray(5);

const TeamDetails = () => {
    const { teamid } = useParams<{ teamid: string }>();
    console.log("Team ID from URL:", teamid);

    const [team, setTeam] = useState<ITeam | null>(null);
    const { info, setInfo } = useInfoHandler();
    const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        console.log("Fetching venue with ID:", teamid);
        const response = await axios.get(backendBaseURL+`/teams/${teamid}`);
        setTeam(response.data);
        console.log("API Response:", response.data);
        setInfo(["Team fetched successfully", "success"])
      } catch (error: any) {
        setInfo(["Error fetching team data", "error"]);
        console.error("Error fetching venue:", error.response);
      }
    };

    fetchVenue();
  }, [teamid]);

 
  useEffect(() => {
    setIsAdmin(checkAdminStatus());
  }, []);

  return (
    team ?
    <section className="bg-gray-100 min-h-screen">
      <BasicDiv ostyle="min-h-[40vh] bg-theme text-theme-w">
        <h1 className="text-5xl font-bold">{team.name}</h1>
        <p className="mt-4 text-lg">Team Id: {team.teamid}</p>
        <p className="mt-4 text-md">"{team.description}"</p>
      </BasicDiv>
      <span>{info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}</span>

      {/* {isAdmin && <ThemeLink label="edit" url={`/team/edit/${teamid}`} />} */}

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Participating Teams ({tempArr.length})</h2>
          <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tempArr.map((team, index) => (
              <BasicDiv key={index} ostyle="bg-theme-w border hover:border-theme rounded-lg shadow-lg">
                <img src={"#"} alt={"team"} className="w-32 h-32 mx-auto mb-4 bg-theme-g" />
                <h3 className="text-xl font-semibold text-theme-g uppercase">teamname</h3>
              </BasicDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Results</h2>
          <div className="grid grid-cols-3 gap-10">
            {tempArr.map((result, index) => (
              <ThemeDiv key={index} ostyle="bg-theme-w p-6">
                <h3 className="text-xl font-semibold text-theme-g uppercase">result match (t1 vs t2)</h3>
                <p className="text-theme-cont">t1 won/loss t2 by ...</p>
              </ThemeDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle=" py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Match Schedule</h2>
          <div className="grid grid-cols-3 gap-8">
            {tempArr.map((match, index) => (
              <MatchCard key={index} />
            ))}
          </div>
        </div>
      </BasicDiv>
    </section> : <Loading />
  );
};

export default TeamDetails;
