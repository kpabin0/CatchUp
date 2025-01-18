import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


interface Tournament {
  tid: number;
  name: string;
  start_date: string;
  end_date: string;
}

const EditTournamentPage: React.FC = () => {
  const { tid } = useParams(); 
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (tid) {
     
      axios
        .get(`http://localhost:3001/tournaments/${tid}`)
        .then((response) => {
          setTournament(response.data);
          setLoading(false); 
        })
        .catch((error) => {
          setError("Error fetching tournament data.");
          setLoading(false);
          console.error("Error fetching tournament data:", error);
        });
    }
  }, [tid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tournament) {
      setTournament({
        ...tournament,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tournament) {
      try {
      
        const response = await axios.put(`http://localhost:3001/tournaments/${tid}`, tournament);
        console.log("Tournament updated:", response.data);
        navigate("/tournament/all"); 
      } catch (error) {
        setError("Error updating tournament data.");
        console.error("Error updating tournament:", error);
      }
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] p-4 py-[2rem] bg-white shadow-xl rounded-md">
        <h2 className="text-2xl font-bold text-center py-5 uppercase">Edit Tournament</h2>
        {tournament && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="tid" className="block text-sm font-medium text-gray-700">Tournament ID</label>
              <input
                type="text"
                id="tid"
                name="tid"
                value={tournament.tid}
                readOnly
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tournament Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={tournament.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Tournament Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={tournament.start_date}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Tournament End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={tournament.end_date}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTournamentPage;
