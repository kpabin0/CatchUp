import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITournament } from "../../data/ITypes";
import { AxiosDelete, AxiosGet, backendBaseURL, checkAdminStatus } from "../../data/utils";
import { Link, useNavigate } from "react-router-dom";
import BorderDiv from "../../components/BorderDiv";
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";

interface ITournamentCard extends ITournament {
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  isAdmin: boolean
};

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<ITournament[]>([]);
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate()
  const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet(`/tournaments`, setTournaments, setInfo);

  }, []);


  const handleDelete = async (tid: number) => {
    AxiosDelete(`/tournaments/${tid}`, setInfo)
    dnav(`/tournaments`, 1000);
  };

  const handleEdit = async (tid: number) => {
    dnav(`/tournaments/edit/${tid}`, 100);
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[80%] p-6 shadow-xl">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          All Tournaments
        </h2>

        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

        <table className="w-full text-md text-center rtl:text-right table-fixed">
          <thead>
            <tr className="text-xl">
              <th>Id</th>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament, ind) => {
              return <TournamentCard key={ind} {...tournament} 
                        handleEdit={handleEdit} 
                        handleDelete={handleDelete} 
                        isAdmin={isAdmin}
                      />
            })}
          </tbody>
        </table>

        <hr className="w-full my-6 border-theme" />

        {isAdmin && (
            <ThemeLink label="Create New Tournament" ostyle="text-xl font-bold" url={"/tournaments/create"} />
        )}
      </BorderDiv>
    </section>
  );
};

const TournamentCard = ({
  tournamentid,
  name,
  start_date,
  end_date,
  handleEdit,
  handleDelete,
  isAdmin
}: ITournamentCard) => {
  return (
    <tr className="my-2 py-2">
      <td>{tournamentid}</td>
      <td>
        <Link
          to={`/tournaments/${tournamentid}`}
          className="hover:text-theme uppercase hover:underline"
        >
          {name}
        </Link>
      </td>
      <td>{start_date.split("T")[0]}</td>
      <td>{end_date.split("T")[0]}</td>

      {isAdmin && (
        <td>
          <FaEdit 
            onClick={() => handleEdit(tournamentid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
            />
          <FaTrash 
            onClick={() => handleDelete(tournamentid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-cont text-theme-cont hover:text-theme-w"
          />
        </td>
      )}
    </tr>
  );
};

export default Tournaments;
