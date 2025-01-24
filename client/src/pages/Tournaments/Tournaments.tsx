import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { getFallbackTournaments } from "../../data/_tournaments";
import { ITournament } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import { Link } from "react-router-dom";


const Tournaments = () => {
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
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
      <div className="w-[80%] p-6 flex flex-col items-center border-2 shadow-xl rounded-lg bg-white">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">All Tournaments</h2>

        {message && <div className="text-theme-green mb-4">{message}</div>}
        {error && <div className="text-theme-cont mb-4">{error}</div>}

        <table className="w-full text-md text-center rtl:text-right table-fixed">
          <thead>
          <tr className="text-xl">
            <th>Id</th>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
          </tr>
          </thead>
          <tbody>
          {tournaments.map((tournament, ind) => {
            return (
              <TournamentCard key={ind} {...tournament} />
            )
          })}
          </tbody>
        </table>
      </div>
    </section>
  )
};

const TournamentCard = ({tournamentid, name, start_date, end_date} : ITournament) => {
  return (
    <tr className="my-2 py-2">
      <td>{tournamentid}</td>
      <td><Link to={"/tournaments/"+tournamentid} className="hover:text-theme uppercase hover:underline">{name}</Link></td>
      <td>{start_date}</td>
      <td>{end_date}</td>
    </tr>

  )
}

export default Tournaments;
