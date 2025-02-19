import React, { useEffect, useState } from "react";
import { IPlayerStats } from "../../utils/ITypes";  
import { _fallbackPlayerStatus, AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const PlayerStats = () => {
  const [playerStats, setPlayerStats] = useState<IPlayerStats[]>();
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet(`/playerstatus`, setPlayerStats, setInfo, _fallbackPlayerStatus);
  }, []);

  const handleDelete = async ({ playerid, matchid }: { playerid: number; matchid: number }) => {
    AxiosDelete(`/playerstatus/${playerid}/${matchid}`, setInfo).then(() => {
      AxiosGet(`/playerstatus`, setPlayerStats, setInfo);
    });
  };
  
  const handleEdit = async ({ playerid, matchid }: { playerid: number; matchid: number }) => {
    dnav(`/playerstatus/edit/${playerid}/${matchid}`, 100);
  };

  return (
    <section className="w-full h-screen flex flex-col justify-evenly items-center">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      <div className="overflow-x-auto w-full max-w-7xl">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Player ID</th>
              <th className="py-2 px-4 border-b text-left">Match ID</th>
              <th className="py-2 px-4 border-b text-left">Balls Played</th>
              <th className="py-2 px-4 border-b text-left">Balls Bowled</th>
              <th className="py-2 px-4 border-b text-left">Runs</th>
              <th className="py-2 px-4 border-b text-left">Runs Conceived</th>
              <th className="py-2 px-4 border-b text-left">Wickets</th>
              <th className="py-2 px-4 border-b text-left">Sixes</th>
              <th className="py-2 px-4 border-b text-left">Fours</th>
              {isAdmin && <th className="py-2 px-4 border-b text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {playerStats?.map((stat, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{stat.playerid}</td>
                <td className="py-2 px-4">{stat.matchid}</td>
                <td className="py-2 px-4">{stat.balls_played}</td>
                <td className="py-2 px-4">{stat.balls_bowled}</td>
                <td className="py-2 px-4">{stat.runs}</td>
                <td className="py-2 px-4">{stat.runs_concieved}</td>
                <td className="py-2 px-4">{stat.wickets}</td>
                <td className="py-2 px-4">{stat.sixes}</td>
                <td className="py-2 px-4">{stat.fours}</td>
                {isAdmin && (
                  <td className="py-2 px-4 flex space-x-2">
                    <Link to={`/playerstatus/view/${stat.playerid}/${stat.matchid}`}>
                      <FaEye className="cursor-pointer text-blue-500 hover:text-blue-700" />
                    </Link>
                    <FaEdit
                      onClick={() => handleEdit({ playerid: stat.playerid, matchid: stat.matchid })}
                      className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                    />
                    <FaTrash
                      onClick={() => handleDelete({ playerid: stat.playerid, matchid: stat.matchid })}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <ThemeLink label="Create New Player Stats" ostyle="text-xl font-bold" url={"/playerstatus/create"} />
      )}
    </section>
  );
};

export default PlayerStats;
