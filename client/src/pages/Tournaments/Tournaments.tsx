import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { getFallbackTournaments } from "../../data/_tournaments";
import { ITournament } from "../../data/ITypes";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

interface ITournamentCard extends ITournament {
  handleEdit: (id : number) => void,
  handleDelete: (id : number) => void
};

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
    // setTournaments(getFallbackTournaments())
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
        `http://localhost:${PORT_NUMBER}/tournaments/delete/${tournamentid}`
      );
      console.log(response.data); 
      setMessage("Tournament deleted successfully.");
      fetchTournaments(); 
    } catch (error: any) {
      console.error("Error deleting tournament:", error);
      setError(error.response?.data.error || "Error deleting tournament.");
      // navigate("/tournaments");
    }
  };


  const handleEdit = (tournamentid: number) => {
    navigate(`/tournaments/edit/${tournamentid}`);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-[40rem] flex flex-col items-center shadow-xl rounded-lg bg-white">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">All Tournaments</h2>

        {message && <div className="text-theme-green mb-4">{message}</div>}
        {error && <div className="text-theme-cont mb-4">{error}</div>}

        <ul className="space-y-4 w-full p-4">
          {tournaments.map((tournament) => {
            return (
              <TournamentCard key={tournament.tournamentid} {...tournament} handleEdit={handleEdit} handleDelete={handleDelete}  />
            )
          })}
        </ul>
      </div>
    </section>
  );
};

const TournamentCard = ({tournamentid, name, start, end, handleEdit, handleDelete} : ITournamentCard) => {
  return (
      <li className="p-4 border rounded-lg shadow-sm hover:border-theme flex flex-row justify-between items-center">     
        <div className="flex flex-col">
          <strong>ID {tournamentid}</strong>
          <strong>Name: {name}</strong>
          <span>Start Date: {new Date(start).toLocaleDateString()}</span>
          <span>End Date: {new Date(end).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col space-y-5">
          <button onClick={() => handleEdit(tournamentid)} className="bg-theme text-theme-w px-4 py-2 rounded">
            <MdEdit />
          </button>
          <button onClick={() => handleDelete(tournamentid)} className="bg-theme-cont text-theme-w px-4 py-2 rounded">
            <MdDeleteForever />
          </button>
        </div>
      </li>
  )
}

export default Tournaments;
