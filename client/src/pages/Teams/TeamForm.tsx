import React, { useState } from 'react';
import axios from 'axios';
import { backendBaseURL } from '../../data/utils';
import TextInputField from '../../components/TextInputField';
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom';
const Teams = () => {

  const [teamData, setTeamData] = useState({
    teamid: '',
    name: '',
    description: ''
  });

  const navigate= useNavigate()
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
      const response = await axios.post(backendBaseURL + `/team/create`, teamData);  // Backend API URL
      console.log('Team created:', response.data);
      setError(null);
      navigate("/teams")
    } catch (error:any) {
      console.error('Error creating team:', error.response);
      setError('Failed to create team. Please try again.');
    }
  };

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      {error && <Message message={error} type="error" onClose={() => setError(null)} />}
      <h1 className="text-3xl mb-4 text-theme uppercase font-extrabold">Add Team</h1>
      <div className="grid grid-cols-3 gap-10">
        <TextInputField 
          label="Team id"
          type="number"
          name="teamid"
          placeholder="Team ID"
          value={teamData.teamid}
          onInputChange={handleInputChange}
        />
        <TextInputField 
          label="Team Name"
          type="text"
          name="name"
          placeholder="Team Name"
          value={teamData.name}
          onInputChange={handleInputChange}
          ostyle="col-span-2"
        />
        <TextInputField
          label="Team Description" 
          type="text"
          name="description"
          placeholder="Description"
          value={teamData.description}
          onInputChange={handleInputChange}
          ostyle="col-span-3"
        />
      </div>
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
  
