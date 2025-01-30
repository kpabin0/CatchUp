import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendBaseURL, checkAdminStatus } from "../../data/utils";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import BorderDiv from "../../components/BorderDiv";
import ThemeLink from "../../components/ThemeLink";
import { ITeam } from "../../data/ITypes";


const AllTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(checkAdminStatus());
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${backendBaseURL}/team`);
      setTeams(response.data);
      setError(null);
    } catch (error: any) {
      setError("Error fetching teams.");
      console.error("Error fetching teams:", error.response);
    }
  };

  const deleteTeam = async (teamid: number) => {
    try {
      console.log("Deleting venue with id: ", teamid);
      await axios.delete(backendBaseURL+`/team/${teamid}`);
      setTeams(teams.filter((team) => team.teamid !== teamid));
    } catch (error: any) {
      console.error("Error deleting team:", error.response.data);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[80%] p-6 shadow-xl">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          All Teams
        </h2>

        {error && <div className="text-theme-cont mb-4">{error}</div>}

        <table className="w-full text-md text-center rtl:text-right table-fixed">
          <thead>
            <tr className="text-xl">
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <TeamCard
                key={team.teamid}
                {...team}
                isAdmin={isAdmin}
                onDelete={deleteTeam}
              />
            ))}
          </tbody>
        </table>

        <hr className="w-full my-6 border-theme" />

        {isAdmin && (
          <ThemeLink
            label="Create New Team"
            ostyle="text-xl font-bold"
            url={"/teams/create"}
          />
        )}
      </BorderDiv>
    </section>
  );
};

interface TeamCardProps extends ITeam {
  isAdmin: boolean;
  onDelete: (teamid: number) => void;
}

const TeamCard = ({ teamid, name, description, isAdmin, onDelete }: TeamCardProps) => {
  return (
    <tr className="my-2 py-2">
      <td>{teamid}</td>
      <td>
        <Link
          to={`/teams/${teamid}`}
          className="hover:text-theme uppercase hover:underline"
        >
          {name}
        </Link>
      </td>
      <td>{description}</td>
      {isAdmin && (
        <td>
          <button
            onClick={() => onDelete(teamid)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FaTrash /> 
          </button>
        </td>
      )}
    </tr>
  );
};

export default AllTeams;

