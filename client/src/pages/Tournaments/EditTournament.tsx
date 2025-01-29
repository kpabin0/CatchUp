import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ITournament } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import TextInputField from "../../components/TextInputField";

const EditTournament = () => {
  const { tid } = useParams(); 
  const [tournament, setTournament] = useState<ITournament | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (tid) {
      axios.get(backendBaseURL + `/tournaments/${tid}`)
      // setTournament({tournamentid: 1, name: "None", start : "2025-2-1", end : "2026-3-4"})
      // setLoading(false);

      axios.get(`http://localhost:8080/tournaments/${tid}`)
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
      
        const response = await axios.put(backendBaseURL + `/tournaments/${tid}`, tournament);
        console.log("Tournament updated:", response.data);
        navigate("/tournaments/"); 
      } catch (error) {
        setError("Error updating tournament data.");
        console.error("Error updating tournament:", error);
      }
    }
  };


  if (loading) return <Loading />;
  if (error) return <div className="text-theme-cont">{error}</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] p-4 py-[2rem] bg-theme-w shadow-xl rounded-md">
        <h2 className="text-2xl text-theme font-extrabold text-center py-5 uppercase">Edit Tournament</h2>
        {tournament && (
          <form onSubmit={handleSubmit}>
            <TextInputField
              label="Tournament ID"
              type="text"
              name="tid"
              value={tournament.tournamentid.toString()}
              readOnly={true}
            />
            <TextInputField
              label="Tournament Name"
              type="text"
              name="name"
              value={tournament.name}
              onInputChange={handleInputChange}
            />
            <TextInputField
              label="Tournament Start"
              type="date"
              name="start_date"
              value={tournament.start_date}
              onInputChange={handleInputChange}
            />
            <TextInputField
              label="Tournament End"
              type="date"
              name="end_date"
              value={tournament.end_date}
              onInputChange={handleInputChange}
            />

            <button type="submit" className="w-full py-2 px-4 bg-theme text-theme-w rounded mt-4">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTournament;
