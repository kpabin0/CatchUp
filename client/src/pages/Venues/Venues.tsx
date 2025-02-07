import React, { useEffect, useState } from "react";
import { IVenue } from "../../utils/ITypes";
import { AxiosDelete, AxiosGet, checkAdminStatus } from "../../utils/utils";
import ThemeLink from "../../components/ThemeLink";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import { useDNavigate } from "../../customhook/dnavigate";
import TableTemplate from "../TableTemplate";

const Venues = () => {
    const [venues, setVenues] = useState<IVenue[]>([]);
    const { info, setInfo } = useInfoHandler();
    const { dnav } = useDNavigate();
    const isAdmin = checkAdminStatus();

  useEffect(() => {
    AxiosGet("/venues", setVenues, setInfo);

  }, []);

  const handleDelete = async (venueid: number) => {
    AxiosDelete(`/venues/${venueid}`, setInfo).then(() => {
      AxiosGet("/venues", setVenues, setInfo);
    }
    );
  };

  const handleEdit = async (venueid: number) => {
    dnav(`/venues/edit/${venueid}`);
  }

  return (
    <section className="w-full h-screen flex flex-col justify-evenly items-center">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}

      <TableTemplate 
        title="Venues"
        th={["venueid", "Name", "seats", "location"]} 
        rd={venues}
        control={{handleEdit, handleDelete}}
      />

      {isAdmin && (
          <ThemeLink label="Create New Venue" ostyle="text-xl font-bold" url={"/venues/create"} />
      )}
    </section>
  );
};


export default Venues;
