import React, { useEffect, useState } from "react";
import { _fallbackTeams, AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";
import ThemeLink from "../../components/ThemeLink";
import { ITeam } from "../../utils/ITypes";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import Message from "../../components/Message";
import TableTemplate from "../TableTemplate";

const Teams = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet(`/teams`, setTeams, setInfo, _fallbackTeams);

  }, []);

  const handleDelete = async (teamid: number) => {
    AxiosDelete(`/teams/${teamid}`, setInfo).then(() => {
      AxiosGet(`/teams`, setTeams, setInfo);
    })
  };

  const handleEdit = (teamid: number) => {
    dnav(`/teams/edit/${teamid}`, 100);
  };

  return (
    <section className="w-full h-screen flex flex-col justify-evenly items-center">

      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      <TableTemplate
        title="All Teams"
        th={["Id", "Name", "Description"]}
        rd={teams}
        control={isAdmin ? {handleEdit, handleDelete}: null}
      />

      {isAdmin && (
        <ThemeLink label="Create New Team" ostyle="text-xl font-bold" url={"/teams/create"} />
      )}
    </section>
  );
};

export default Teams;



