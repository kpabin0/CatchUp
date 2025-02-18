import React, { useEffect, useState } from "react";
import { IMatch } from "../../utils/ITypes";  // Assuming you have an IMatch type
import { _fallbackMatches, AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";  // Add necessary utils
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import TableTemplate from "../TableTemplate";

const Matchess = () => {
  const [matches, setMatches] = useState<IMatch[]>();
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus();

  useEffect(() => {

    AxiosGet(`/matches`, setMatches, setInfo, _fallbackMatches);
  }, []);

  const handleDelete = async (matchid: number) => {
    AxiosDelete(`/matches/${matchid}`, setInfo).then(() => {
      AxiosGet(`/matches`, setMatches, setInfo);  
    });
  };

  const handleEdit = async (matchid: number) => {
    dnav(`/matches/edit/${matchid}`, 100);
  };

  return (
    <section className="w-full h-screen flex flex-col justify-evenly items-center">

      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      <TableTemplate 
        title="Matches"
        th={["Match id", "Team 1", "Team 2", "Date", "Venueid"]}
        rd={matches}
        control={isAdmin ? { handleEdit, handleDelete } : null}
      />

      {isAdmin && (
        <ThemeLink label="Create New Match" ostyle="text-xl font-bold" url={"/matches/create"} />
      )}
    </section>
  );
};

export default Matchess;
