import React, { useState } from 'react';
import axios from 'axios';

const Teams: React.FC = () => {

  const [teamData, setTeamData] = useState({
    id: '',
    name: '',
    headCoach: '',
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
      const response = await axios.post('http://localhost:5000/team/teams', teamData);  // Backend API URL
      console.log('Team created:', response.data);
      setError(null);
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team. Please try again.');
    }
  };

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
      <h1 className="text-2xl mb-4">Create a Team</h1>

    
      <div className="space-y-4">
        <input
          type="number"
          name="id"
          placeholder="Team ID"
          value={teamData.id}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Team Name"
          value={teamData.name}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="headCoach"
          placeholder="Head Coach"
          value={teamData.headCoach}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={teamData.description}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
        
        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Team
        </button>
      </div>
    </section>
  );
};

export default Teams;
  
