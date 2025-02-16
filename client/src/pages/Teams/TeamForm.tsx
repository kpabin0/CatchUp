import { ITeamForm } from '../../utils/ITypes';
import GenericForm, { IInputFieldProps } from '../../components/GenericForm';

interface ITeamFormCard {
  d?: ITeamForm,
  onSubmit: (d: ITeamForm) => void
};


const TeamFormCard = ({d, onSubmit}: ITeamFormCard) => {

  const fields: IInputFieldProps[] = [
    {label: "Team id", name: "teamid", type: "number", value: d?.teamid?.toString() || '0', readOnly: true},
    {label: "Name", name: "name", type: "text", value: d?.name, required: true},
    {label: "Description", name: "description", type: "text", value: d?.description, required: true},
  ]
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
    <GenericForm 
      fields={fields}
      onSubmit={onSubmit}
    />
  );
};
export default TeamFormCard;
  
