import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IPlayer, ITeam } from "../../utils/ITypes"; 
import { backendBaseURL } from "../../utils/utils";

const PlayerForm = () => {
  const [name, setName] = useState<string>("");
  const [teamid, setTeamid] = useState<number | "">("");
  const [teams, setTeams] = useState<ITeam[]>([]);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
    if (id) fetchPlayer();
  }, [id]);

  const fetchTeams = async () => {
    try {
      const res = await axios.get<ITeam[]>("http://localhost:5000/ap");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchPlayer = async () => {
    try {
     
    //   const res = await axios.get<IPlayer>(`http://localhost:5000/api/players/${id}`);
       const res = await axios.get<IPlayer>(backendBaseURL +`/players/${id}`);
      setName(res.data.name);
      setTeamid(res.data.teamid);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const playerData: Partial<IPlayer> = { name, teamid: Number(teamid) };
      if (id) {
        await axios.put( backendBaseURL + `/players/${id}`, playerData);
      } else {
        await axios.post(backendBaseURL+`/players`, playerData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Player" : "Add Player"}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Player Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Select Team:</label>
        <select
          value={teamid}
          onChange={(e) => setTeamid(e.target.value as unknown as number)}
          required
          className="border p-2 w-full mb-4"
        >
          <option value="">-- Select Team --</option>
          {teams.map((team) => (
            <option key={team.teamid} value={team.teamid}>
              {team.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
