import React, { useEffect, useState } from "react";
import { AxiosDelete, AxiosGet, checkAdminStatus } from "../../data/utils";
import { Link } from "react-router-dom";
import { FaTrash,FaEdit } from "react-icons/fa"; 
import BorderDiv from "../../components/BorderDiv";
import ThemeLink from "../../components/ThemeLink";
import { ITeam } from "../../data/ITypes";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import Message from "../../components/Message";

const Teams = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet(`/teams`, setTeams, setInfo);

  }, []);

  const deleteTeam = async (teamid: number) => {
    AxiosDelete(`/teams/${teamid}`, setInfo);
    dnav('/teams', 1000);
    // left to do, write logic to reload
  };

  const handleEdit = (teamid: number) => {
    dnav(`/teams/edit/${teamid}`, 100);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[80%] p-6 shadow-xl">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          All Teams
        </h2>

        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

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
                onEdit={handleEdit}  
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
  onEdit: (teamid: number) => void; // Add onEdit as a prop
}

const TeamCard = ({ teamid, name, description, isAdmin, onDelete, onEdit }: TeamCardProps) => {
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
          <FaEdit
            onClick={() => onEdit(teamid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
          />
          <FaTrash
            onClick={() => onDelete(teamid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-cont text-theme-cont hover:text-theme-w"
          />
        </td>
      )}
    </tr>
  );
};

export default Teams;



