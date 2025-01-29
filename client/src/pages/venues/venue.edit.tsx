import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IVenue } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import TextInputField from "../../components/TextInputField";
import Message from "../../components/Message";
import ThemeFormDiv from "../../components/ThemeFormDiv";

const EditVenue = () => {
  const { venueid } = useParams(); 
  const [venue, setVenue] = useState<IVenue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (venueid) {
      axios.get(`${backendBaseURL}/venues/${venueid}`)
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

  const handleInputChange = (e: any) => {
    if (venue) {
      setVenue({
        ...venue,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (venue) {
      try {
        const response = await axios.put(`${backendBaseURL}/venues/${venueid}`, venue);
        console.log("Venue updated:", response.data);
        setSuccessMessage("Venue updated successfully!");
        setError(null); 
      } catch (error) {
        setError("Error updating venue data.");
        console.error("Error updating venue:", error);
        setSuccessMessage(null); 
      }
      setTimeout(() => {  navigate("/venues") }, 1000);
    }
  };
  

  if (loading) return <Loading />;
  if (error) return <div className="w-full h-screen text-center text-theme-cont">{error}</div>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThemeFormDiv ostyle="justify-evenly border">

        {successMessage && <Message message={successMessage} type="success" onClose={() => setSuccessMessage("")} />}
        {error && <Message message={error} type="error" onClose={() => setError("")} />}

        <h2 className="text-2xl text-theme font-extrabold text-center pb-5 uppercase">
          Edit Venue
        </h2>
  
        {venue ?
          <form onSubmit={handleSubmit} className="w-[90%]">
            <TextInputField
              type="text"
              label="Venue ID"
              name="venueid"
              value={venue.venueid.toString()}
              readOnly={true}
            />
            <TextInputField 
              type="text"
              label="Venue Name"
              name="name"
              value={venue.name}
              placeholder="Enter venue name"
              required={true}
              onInputChange={handleInputChange}
            />
            <TextInputField 
              type="number"
              label="Number of Seats"
              name="seats"
              value={venue.seats.toString()}
              placeholder="Enter number of seats"
              required={true}
              onInputChange={handleInputChange}
            />
            <TextInputField 
              type="text"
              label="Location"
              name="location"
              value={venue.location}
              placeholder="Enter location"
              required={true}
              onInputChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-theme hover:bg-theme-alt text-theme-w rounded mt-4"
            >
              Save Changes
            </button>
          </form> : <Loading />
        }
      </ThemeFormDiv>
    </div>
  );
  
};

export default EditVenue;


