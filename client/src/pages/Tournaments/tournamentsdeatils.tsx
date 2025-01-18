import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Tournament {
  tournamentid: number;
  name: string;
  start: string;
  end_date: string;
}

const TournamentDetailsPage: React.FC = () => {
  const { tid } = useParams<{ tid: string }>();
  console.log("Tournament ID from URL:", tid);  

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [error, setError] = useState<string | null>(null);

  const PORT_NUMBER = "3001";

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tid) {
        setError("Tournament ID is missing.");
        return;
      }

      try {
        console.log("Fetching tournament with ID:", tid);  
        const response = await axios.get(
          `http://localhost:${PORT_NUMBER}/tournaments/${tid}`
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

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] p-4 py-10 flex flex-col items-center shadow-xl">
        <h2 className="text-2xl font-bold text-theme text-center py-5 uppercase">
          Tournament Details
        </h2>

        {error && <div className="text-red-500">{error}</div>}

        {tournament ? (
          <div className="w-full">
            <div className="space-y-4">
              <div>
                <strong>Tournament ID:</strong> {tournament.tournamentid}
              </div>
              <div>
                <strong>Name:</strong> {tournament.name}
              </div>
              <div>
                <strong>Start Date:</strong> {tournament.start}
              </div>
              <div>
                <strong>End Date:</strong> {tournament.end_date}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading tournament data...</div>
        )}
      </div>
    </section>
  );
};

export default TournamentDetailsPage;
