import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendBaseURL, getArray } from "../../data/utils";
import { ITournament } from "../../data/ITypes";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../data/utils";
import ThemeDiv from "../../components/ThemeDiv";
import { MatchCard } from "../Matches/Matches";

const tempArr = getArray(5)

const TournamentDetails = () => {
  const { tid } = useParams<{ tid: string }>();
  console.log("Tournament ID from URL:", tid);  
  const [isAdmin, setIsAdmin] = useState(false); 

  const [tournament, setTournament] = useState<ITournament | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tid) {
        setError("Tournament ID is missing.");
        return;
      }

      try {
        console.log("Fetching tournament with ID:", tid);  
        const response = await axios.get(
          backendBaseURL + `/tournaments/${tid}`
        );
        console.log("API Response:", response.data); 

        if (response.data) {
          setTournament(response.data);
        } else {
          setError("Tournament not found.");
        }
      } catch (error: any) {
        setError("Error fetching tournament data.");
        console.error("Error fetching tournament:", error);
      }
    };

    if (tid) {
      fetchTournament();
    }
  }, [tid]);


  useEffect(() => {
    setIsAdmin(checkAdminStatus());
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen">
      <BasicDiv ostyle="min-h-[40vh] bg-theme text-theme-w">
        <h1 className="text-5xl font-bold">{tournament?.name}</h1>
        <p className="mt-4 text-lg">Tournament Id: {tournament?.tournamentid} | Start: {tournament?.start_date.split("T")[0]} | End: {tournament?.end_date.split("T")[0]}</p>
      </BasicDiv>

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
              <MatchCard />
            ))}
          </div>
        </div>
      </BasicDiv>

    </section>
  );
};

export default TournamentDetails;
