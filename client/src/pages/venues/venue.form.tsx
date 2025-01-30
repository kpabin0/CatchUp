import React, { useState } from "react";
import axios from "axios";
import { backendBaseURL } from "../../data/utils";
import TextInputField from "../../components/TextInputField";
import ThemeFormDiv from "../../components/ThemeFormDiv";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const VenueCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    seats: "",
    location: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendBaseURL+`/venues/create`, formData);
      setResponseMessage(`Venue created successfully: ${JSON.stringify(response.data)}`);
      console.log(e);
      navigate("/venues");
    } catch (error:any) {
      console.error("Error creating venue:", error);
      setResponseMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThemeFormDiv ostyle="py-6 border justify-evenly">
      {responseMessage && <Message message={responseMessage} type="success" onClose={() => setResponseMessage("")} />}
      
      <h1 className="text-xl font-bold mb-5 text-theme">Create a New Venue</h1>
      <form onSubmit={handleSubmit} className="w-[90%] space-y-4">

        <TextInputField 
          type="text"
          label="Venue Name"
          name="name"
          value={formData.name}
          placeholder="Enter venue name"
          required={true}
          onInputChange={handleInputChange}
        />
        <TextInputField 
          type="number"
          label="Number of Seats"
          name="seats"
          value={formData.seats}
          placeholder="Enter number of seats"
          required={true}
          onInputChange={handleInputChange}
        />
        <TextInputField 
          type="text"
          label="Location"
          name="location"
          value={formData.location}
          placeholder="Enter location"
          required={true}
          onInputChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-theme text-white py-2 rounded hover:bg-theme-alt transition"
        >
          Create Venue
        </button>
      </form>
      </ThemeFormDiv>
    </div>
  );
};

export default VenueCreateForm;
