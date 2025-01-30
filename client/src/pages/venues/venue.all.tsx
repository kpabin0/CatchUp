import React, { useEffect, useState } from "react";
import axios from "axios";
import { IVenue } from "../../data/ITypes";
import { backendBaseURL, checkAdminStatus } from "../../data/utils";
import { Link } from "react-router-dom";
import BorderDiv from "../../components/BorderDiv";
import ThemeLink from "../../components/ThemeLink";
import { FaTrash } from "react-icons/fa"; 

const Venue = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    setIsAdmin(checkAdminStatus());
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(backendBaseURL + `/venues`);
      setVenues(response.data);
      setMessage(null);
    } catch (error: any) {
      setError("Error fetching venues.");
      console.error(error);
    }
  };

 
  const handleDelete = async (venueid: number) => {
    try {
      console.log("Deleting venue with id: ", venueid);
      const response = await axios.delete(backendBaseURL + `/venues/${venueid}`);
      setMessage("Venue deleted successfully!");
      fetchVenues();
    } catch (error: any) {
      setError("Error deleting venue.");
      console.error(error.response.data);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[80%] p-6 shadow-xl">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          All Venues
        </h2>

        {message && <div className="text-theme-green mb-4">{message}</div>}
        {error && <div className="text-theme-cont mb-4">{error}</div>}

        <table className="w-full text-md text-center rtl:text-right table-fixed">
          <thead>
            <tr className="text-xl">
              <th>Id</th>
              <th>Name</th>
              <th>Seats</th>
              <th>Location</th>
              {isAdmin && <th>Actions</th>} 
            </tr>
          </thead>
          <tbody>
            {venues.map((venue, ind) => {
              return (
                <VenueCard
                  key={ind}
                  {...venue}
                  isAdmin={isAdmin}
                  handleDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>

        <hr className="w-full my-6 border-theme" />

        {isAdmin && (
            <ThemeLink label="Create New Venue" ostyle="text-xl font-bold" url={"/venues/create"} />
        )}
      </BorderDiv>
    </section>
  );
};

const VenueCard = ({
  venueid,
  name,
  seats,
  location,
  isAdmin,
  handleDelete,
}: IVenue & { isAdmin: boolean; handleDelete: (venueid: number) => void }) => {
  return (
    <tr className="my-2 py-2">
      <td>{venueid}</td>
      <td>
        <Link
          to={`/venues/${venueid}`}
          className="hover:text-theme uppercase hover:underline"
        >
          {name}
        </Link>
      </td>
      <td>{seats}</td>
      <td>{location}</td>

      {isAdmin && (
        <td>
          <button
            onClick={() => handleDelete(venueid)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash /> 
          </button>
        </td>
      )}
    </tr>
  );
};

export default Venue;
