import React, { useEffect, useState } from "react";
import { IMatch } from "../../utils/ITypes";  // Assuming you have an IMatch type
import { _fallbackMatchesTable, AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";  // Add necessary utils
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import TableTemplate from "../TableTemplate";
import BorderDiv from "../../components/BorderDiv";

const Matches = () => {
  const [matches, setMatches] = useState<IMatch[]>();
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus();

  useEffect(() => {

    AxiosGet(`/matches`, setMatches, setInfo, _fallbackMatchesTable);
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
        th={["Match id", "Tournament ID", "Team 1", "Team 2", "Extra 1", "Extra 2", "Venueid", "Date"]}
        rd={matches}
        control={isAdmin ? { handleEdit, handleDelete } : null}
      />

      {isAdmin && (
        <ThemeLink label="Create New Match" ostyle="text-xl font-bold" url={"/matches/create"} />
      )}
    </section>
  );
};

export default Matches;


// later pass the props accordingly
export const MatchCard = ({}) => {
  return (
    <BorderDiv ostyle="bg-theme-w p-2 py-5 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold text-theme uppercase mb-2">Team 1 vs Team 2</h3>
      <p className="">{new Date().getFullYear()} | {new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      <p className="text-theme-red">Venue: name</p>
    </BorderDiv>
  )
}