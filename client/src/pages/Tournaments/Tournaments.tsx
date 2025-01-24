import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { getFallbackTournaments } from "../../data/_tournaments";
import { ITournamentPointsTable } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";


const Tournaments = () => {
  const [tournaments, setTournaments] = useState<ITournamentPointsTable[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(backendBaseURL + `/tournaments`);
      setTournaments(response.data);
      setMessage(null);
    } catch (error: any) {
      setError("Error fetching tournaments.");
      setTournaments(getFallbackTournaments());
      setError(null);
      console.error(error);
    }
  };


  // const handleDelete = async (tournamentid: number) => {
  //   try {
  //     const response = await axios.delete(
  //       backendBaseURL + `/tournaments/delete/${tournamentid}`
  //     );
  //     console.log(response.data); 
  //     setMessage("Tournament deleted successfully.");
  //     fetchTournaments(); 
  //   } catch (error: any) {
  //     console.error("Error deleting tournament:", error);
  //     setError(error.response?.data.error || "Error deleting tournament.");
  //     navigate("/tournaments");
  //   }
  // };


  // const handleEdit = (tournamentid: number) => {
  //   navigate(`/tournaments/edit/${tournamentid}`);
  // };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="p-6 flex flex-col items-center border-2 shadow-xl rounded-lg bg-white">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">All Tournaments</h2>

        {message && <div className="text-theme-green mb-4">{message}</div>}
        {error && <div className="text-theme-cont mb-4">{error}</div>}

        <table className="text-center border border-theme">
          <tr className="border border-theme">
            <th>Name</th>
            <th>Matches Played</th>
            <th>Matches Won</th>
            <th>Matches Tied</th>
            <th>Matches Loss</th>
            <th>Points</th>
          </tr>
          {tournaments.map((tournament, ind) => {
            return (
              <TournamentCard key={ind} {...tournament} />
            )
          })}
        </table>
      </div>
    </section>
  )
};

const TournamentCard = ({team_name, matches_played, matches_won, matches_tied, points} : ITournamentPointsTable) => {
  return (
    <tr className="my-2 py-2 text-sm">
      <td>{team_name}</td>
      <td>{matches_played}</td>
      <td>{matches_won}</td>
      <td>{matches_tied}</td>
      <td>{matches_played - matches_won - matches_tied}</td>
      <td>{points}</td>
    </tr>

  )
}

export default Tournaments;
