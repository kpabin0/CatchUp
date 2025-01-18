import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Tournament {
  tournamentid: number;
  name: string;
  start: string;
  end_date: string;
}

const PORT_NUMBER = "3001";

const GetTournamentsPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`http://localhost:${PORT_NUMBER}/tournaments`);
      setTournaments(response.data);
      setMessage(null);
    } catch (error: any) {
      setError("Error fetching tournaments.");
      console.error(error);
    }
  };


  const handleDelete = async (tournamentid: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT_NUMBER}/tournaments/${tournamentid}`
      );
      console.log(response.data); 
      setMessage("Tournament deleted successfully.");
      fetchTournaments(); 
    } catch (error: any) {
      console.error("Error deleting tournament:", error);
      setError(error.response?.data.error || "Error deleting tournament.");
    }
  };


  const handleEdit = (tournamentid: number) => {
    navigate(`/edit-tournament/${tournamentid}`);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-[40rem] h-auto p-4 flex flex-col items-center shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-5">All Tournaments</h2>

        {message && <div className="text-green-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <ul className="space-y-4 w-full">
          {tournaments.map((tournament) => (
            <li
              key={tournament.tournamentid}
              className="p-4 border rounded-lg shadow-sm"
            >
              <div>
                <strong>ID:</strong> {tournament.tournamentid}
              </div>
              <div>
                <strong>Name:</strong> {tournament.name}
              </div>
              <div>
                <strong>Start Date:</strong>{" "}
                {new Date(tournament.start).toLocaleDateString()}
              </div>
              <div>
                <strong>End Date:</strong>{" "}
                {new Date(tournament.end_date).toLocaleDateString()}
              </div>

          
              <button
                onClick={() => handleDelete(tournament.tournamentid)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded mr-2"
              >
                Delete
              </button>

              
              <button
                onClick={() => handleEdit(tournament.tournamentid)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GetTournamentsPage;
