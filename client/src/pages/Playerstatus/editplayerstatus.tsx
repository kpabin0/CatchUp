import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IPlayerStats } from "../../utils/ITypes";
import { AxiosGet, backendBaseURL } from "../../utils/utils";

const PlayerStatusForm = () => {
  const [playerid, setPlayerId] = useState<number | "">("");
  const [matchid, setMatchId] = useState<number | "">("");
  const [ballsPlayed, setBallsPlayed] = useState<number>(0);
  const [ballsBowled, setBallsBowled] = useState<number>(0);
  const [runs, setRuns] = useState<number>(0);
  const [runsConceded, setRunsConceded] = useState<number>(0);
  const [wickets, setWickets] = useState<number>(0);
  const [sixes, setSixes] = useState<number>(0);
  const [fours, setFours] = useState<number>(0);

  const { playeridd, matchidd } = useParams<{ playeridd?: string; matchidd?: string }>();
  const navigate = useNavigate();

  
  useEffect(() => {
  if (playeridd && matchidd) {
      setPlayerId(Number(playeridd)); 
      setMatchId(Number(matchidd)); 
      fetchPlayer(Number(playeridd), Number(matchidd));
    }
  }, [playeridd, matchidd]);

  const fetchPlayer = async (playerid: number, matchid: number) => {
    try {
      if (playerid && matchid) {
        console.log("Player and match id", playerid, matchid);
  
        // Provide the required arguments to AxiosGet
        AxiosGet(
          `/playerstatus/${playerid}/${matchid}`,
          (data: any) => {
            console.log("Fetched Player Stats:", data);
  
            // Set the state with the fetched data
            setBallsPlayed(data.balls_played || 0);
            setBallsBowled(data.balls_bowled || 0);
            setRuns(data.runs || 0);
            setRunsConceded(data.runs_concieved || 0);
            setWickets(data.wickets || 0);
            setSixes(data.sixes || 0);
            setFours(data.fours || 0);
          },
          (info: any) => {
            console.log("Fetch status:", info);
            // You can update your info state here, e.g., show a success or failure message
          }
        );
      }
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData: Partial<IPlayerStats> = {
      playerid: Number(playerid),
      matchid: Number(matchid),
      balls_played: ballsPlayed,
      balls_bowled: ballsBowled,
      runs,
      runs_concieved: runsConceded,
      wickets,
      sixes,
      fours,
    };

    try {
      if (playerid && matchid) {
        await axios.put(`${backendBaseURL}/playerstatus/${playerid}/${matchid}`, playerData);
      } else {
        await axios.post(`${backendBaseURL}/playerstatus`, playerData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving player stats:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-green-600 text-2xl font-bold text-center mb-4">
          {playeridd && matchidd ? "Edit Player Stats" : "Add Player Stats"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Player ID</label>
              <input
                type="number"
                value={playerid}
                onChange={(e) => setPlayerId(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Match ID</label>
              <input
                type="number"
                value={matchid}
                onChange={(e) => setMatchId(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Balls Played</label>
              <input
                type="number"
                value={ballsPlayed}
                onChange={(e) => setBallsPlayed(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Balls Bowled</label>
              <input
                type="number"
                value={ballsBowled}
                onChange={(e) => setBallsBowled(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Runs</label>
              <input
                type="number"
                value={runs}
                onChange={(e) => setRuns(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Runs Conceded</label>
              <input
                type="number"
                value={runsConceded}
                onChange={(e) => setRunsConceded(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Wickets</label>
              <input
                type="number"
                value={wickets}
                onChange={(e) => setWickets(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Sixes</label>
              <input
                type="number"
                value={sixes}
                onChange={(e) => setSixes(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Fours</label>
              <input
                type="number"
                value={fours}
                onChange={(e) => setFours(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            {playeridd && matchidd ? "Update Player Stats" : "Add Player Stats"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerStatusForm;
