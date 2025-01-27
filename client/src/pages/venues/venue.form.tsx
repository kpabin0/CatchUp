import React, { useState } from "react";
import axios from "axios";
import { IVenue } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
const VenueCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    seats: "",
    location: "",
  });

  const [responseMessage, setResponseMessage] = useState("");


  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(backendBaseURL+`/venues/create`, formData);
      setResponseMessage(`Venue created successfully: ${JSON.stringify(response.data)}`);
    } catch (error:any) {
      console.error("Error creating venue:", error);
      setResponseMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-5">Create a New Venue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium mb-2" htmlFor="name">
            Venue Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter venue name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="seats">
            Number of Seats
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
            placeholder="Enter number of seats"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Venue
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p className="text-sm">{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default VenueCreateForm;
