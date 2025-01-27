import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IVenue } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";

const EditVenue = () => {
  const { venueid } = useParams(); 
  const [venue, setVenue] = useState<IVenue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (venueid) {
      axios
        .get(`${backendBaseURL}/venues/${venueid}`)
        .then((response) => {
          setVenue(response.data); 
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching venue data.");
          setLoading(false);
          console.error("Error fetching venue data:", error);
        });
    }
  }, [venueid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (venue) {
      setVenue({
        ...venue,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (venue) {
      try {
        const response = await axios.put(`${backendBaseURL}/venues/${venueid}`, venue);
        console.log("Venue updated:", response.data);
        setSuccessMessage("Venue updated successfully!");
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Error updating venue data.");
        console.error("Error updating venue:", error);
        setSuccessMessage(null); // Clear the success message if there's an error
      }
    }
  };
  

  if (loading) return <Loading />;
  if (error) return <div className="text-theme-cont">{error}</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] p-4 py-[2rem] bg-theme-w shadow-xl rounded-md">
        <h2 className="text-2xl text-theme font-extrabold text-center py-5 uppercase">
          Edit Venue
        </h2>
  
        {successMessage && (
          <div className="text-green-600 text-center mb-4">{successMessage}</div>
        )}
  
        {error && (
          <div className="text-red-600 text-center mb-4">{error}</div>
        )}
  
        {venue && (
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
               <label htmlFor="venueid" className="block text-sm font-medium text-theme">
                 Venue ID
               </label>
              <input
                type="text"
                id="venueid"
                name="venueid"
                value={venue.venueid}
                readOnly
                className="mt-1 p-2 w-full border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-theme">
                Venue Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={venue.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded outline-none focus:border-b-theme"
              />
            </div>
            
            <div className="mb-4">
               <label htmlFor="seats" className="block text-sm font-medium text-theme">
                 Number of Seats
               </label>
               <input
                type="number"
                id="seats"
                name="seats"
                value={venue.seats}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded outline-none focus:border-b-theme"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-theme">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={venue.location}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded outline-none focus:border-b-theme"
              />
            </div>

  
          
  
            <button
              type="submit"
              className="w-full py-2 px-4 bg-theme text-theme-w rounded mt-4"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
  
};

export default EditVenue;


