import React, { useEffect, useState } from "react";
import axios from "axios";
import { IVenue } from "../../data/ITypes";
import { backendBaseURL, checkAdminStatus } from "../../data/utils";
import BorderDiv from "../../components/BorderDiv";
import ThemeLink from "../../components/ThemeLink";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

interface IVenueCard extends IVenue {
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  isAdmin: boolean
};

const Venue = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

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

  const handleEdit = async (venueid: number) => {
    navigate(`/venues/edit/${venueid}`);
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[80%] p-6 shadow-xl">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          All Venues
        </h2>

        {message && <Message message={message} type="success" onClose={() => setMessage(null)} />}
        {error && <Message message={error} type="error" onClose={() => setError(null)} />}

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
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  isAdmin={isAdmin}
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
  handleEdit,
  handleDelete,
  isAdmin
}: IVenueCard )=> {
  return (
    <tr className="my-2 py-2">
      <td>{venueid}</td>
      <td>{name}</td>
      <td>{seats}</td>
      <td>{location}</td>

      {isAdmin && (
        <td>
          <FaEdit 
            onClick={() => handleEdit(venueid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
            />
          <FaTrash 
            onClick={() => handleDelete(venueid)}
            className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-cont text-theme-cont hover:text-theme-w"
          />
        </td>
      )}
    </tr>
  );
};

export default Venue;
