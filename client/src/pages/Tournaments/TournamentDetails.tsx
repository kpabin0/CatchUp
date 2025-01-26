import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendBaseURL } from "../../data/utils";
import { ITournament } from "../../data/ITypes";
import BorderDiv from "../../components/BorderDiv";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../data/utils";
import ThemeLink from "../../components/ThemeLink";
import Loading from "../../components/Loading";

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
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[30rem] p-4 py-10 shadow-xl">
          
        <h2 className="text-2xl font-bold text-theme text-center py-5 uppercase">
          Tournament Details
        </h2>

        {error && <div className="text-theme-cont">{error}</div>}

        {tournament ? (
          <>
          <BasicDiv ostyle="w-full">
            <div className="space-y-4">
              <div>
                <strong>Tournament ID:</strong> {tournament.tournamentid}
              </div>
              <div>
                <strong>Name:</strong> {tournament.name}
              </div>
              <div>
                <strong>Start Date:</strong> {tournament.start_date}
              </div>
              <div>
                <strong>End Date:</strong> {tournament.end_date}
              </div>
            </div>
          </BasicDiv>
          {isAdmin && <ThemeLink ostyle="m-4" label="Edit" url={`/tournaments/edit/${tournament?.tournamentid}`} />}
          </>
        ) : (
          <Loading />
        )}
      </BorderDiv>
    </section>
  );
};

export default TournamentDetails;
