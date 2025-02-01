import React from 'react'
import FormWrapper from '../FormWrapper'
import { useNavigate } from 'react-router-dom';
import { useInfoHandler } from '../../customhook/info';
import { ITeamForm } from '../../data/ITypes';
import axios from 'axios';
import { backendBaseURL } from '../../data/utils';
import Message from '../../components/Message';
import TeamFormCard from './TeamForm';

const CreateTeam = () => {
    const navigate = useNavigate();

    const { info, setInfo } = useInfoHandler();
  
    const createTeam = async (data: any) => {
      try {
          const response = await axios.post(backendBaseURL + `/teams/create`, data);
          console.log("Team created successfully:", response.data);
          setInfo(["Team created successfully!", "success"]);
          setTimeout(() => navigate("/teams"), 1000);
      } catch (error: any) {
          console.error("Error creating team:", error);
          setInfo(["Error creating team", "error"])
      }
    };
  
    const onSubmit = (data: ITeamForm) => {
        createTeam(data)
    }

  return (
    <FormWrapper title="Add Team">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <TeamFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreateTeam