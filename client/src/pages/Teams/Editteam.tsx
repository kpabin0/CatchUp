import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ITeam } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import TextInputField from "../../components/TextInputField";
import Message from "../../components/Message";
import ThemeFormDiv from "../../components/ThemeFormDiv";

const EditTeam = () => {
  const { teamid } = useParams(); 
  const [team, setTeam] = useState<ITeam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (teamid) {
      axios.get(`${backendBaseURL}/team/${teamid}`)
        .then((response) => {
          setTeam(response.data); 
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching venue data.");
          setLoading(false);
          console.error("Error fetching venue data:", error);
        });
    }
  }, [teamid]);

  const handleInputChange = (e: any) => {
    if (team) {
      setTeam({
        ...team,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (team) {
      try {
        const response = await axios.put(`${backendBaseURL}/team/${teamid}`, team);
        console.log("Team updated:", response.data);
        setSuccessMessage("Team updated successfully!");
        setError(null); 
      } catch (error) {
        setError("Error updating team data.");
        console.error("Error updating team:", error);
        setSuccessMessage(null); 
      }
      setTimeout(() => {  navigate("/teams") }, 1000);
    }
  };
  

  if (loading) return <Loading />;
  if (error) return <div className="w-full h-screen text-center text-theme-cont">{error}</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThemeFormDiv ostyle="justify-evenly border">

        {successMessage && <Message message={successMessage} type="success" onClose={() => setSuccessMessage("")} />}
        {error && <Message message={error} type="error" onClose={() => setError("")} />}

        <h2 className="text-2xl text-theme font-extrabold text-center pb-5 uppercase">
          Edit Team
        </h2>
  
        {team ?
          <form onSubmit={handleSubmit} className="w-[90%]">
            <TextInputField
              type="text"
              label="Team ID"
              name="teamid"
              value={team.teamid.toString()}
              readOnly={true}
            />
            <TextInputField 
              type="text"
              label="Team Name"
              name="name"
              value={team.name}
              placeholder="Enter team name"
              required={true}
              onInputChange={handleInputChange}
            />
         
            <TextInputField 
              type="text"
              label="description"
              name="description"
              value={team.description}
              placeholder="Enter desciption"
              required={true}
              onInputChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-theme hover:bg-theme-alt text-theme-w rounded mt-4"
            >
              Save Changes
            </button>
          </form> : <Loading />
        }
      </ThemeFormDiv>
    </div>
  );
  
};

export default EditTeam;


