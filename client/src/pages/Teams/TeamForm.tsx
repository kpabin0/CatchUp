import React, { useState } from 'react';
import axios from 'axios';

const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

const Teams = () => {

  const [teamData, setTeamData] = useState({
    id: '',
    name: '',
    description: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value
    });
  };

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post(`http://localhost:${PORT_NUMBER}/team/create`, teamData);  // Backend API URL
      console.log('Team created:', response.data);
      setError(null);
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team. Please try again.');
    }
  };

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      <h1 className="text-3xl mb-4 text-theme uppercase font-extrabold">Add Team</h1>
      <div className="grid grid-cols-3 gap-10">
        <input
          type="number"
          name="id"
          placeholder="Team ID"
          value={teamData.id}
          onChange={handleInputChange}
          className="p-2 border-2 outline-none focus:border-b-theme rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Team Name"
          value={teamData.name}
          onChange={handleInputChange}
          className="p-2 col-span-2 border-2 outline-none focus:border-b-theme rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={teamData.description}
          onChange={handleInputChange}
          className="p-2 col-span-3 border-2 outline-none focus:border-b-theme rounded"
        />
        </div>
        {error && <p className="text-theme-cont">{error}</p>}
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-theme text-theme-w rounded hover:bg-theme-alt"
        >
          Create Team
        </button>
    </section>
  );
};

export default Teams;
  
