import React, { useEffect, useState } from "react";
import { ITournament } from "../../utils/ITypes";
import { AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import TableTemplate from "../TableTemplate";

interface ITournamentCard extends ITournament {
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  isAdmin: boolean
};

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<ITournament[]>();
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate()
  const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet(`/tournaments`, setTournaments, setInfo);
  }, []);

  const handleDelete = async (tid: number) => {
    AxiosDelete(`/tournaments/${tid}`, setInfo).then(() => {
      AxiosGet(`/tournaments`, setTournaments, setInfo);
    })
  };

  const handleEdit = async (tid: number) => {
    dnav(`/tournaments/edit/${tid}`, 100);
  }

  return (
    <section className="w-full h-screen flex flex-col justify-evenly items-center">

      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      <TableTemplate 
        title="Tournaments"
        th={["Tournament id", "Name", "Start date", "End date"]} 
        rd={tournaments}
      />

      {isAdmin && (
          <ThemeLink label="Create New Tournament" ostyle="text-xl font-bold" url={"/tournaments/create"} />
      )}
    </section>
  );
};

const Control = ({handleEdit, handleDelete} : any) => {
  return (
    <>
      <FaEdit 
        onClick={handleEdit}
        className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
        />
      <FaTrash 
        onClick={handleDelete}
        className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-cont text-theme-red hover:text-theme-w"
      />
    </>
  )
}

export default Tournaments;
