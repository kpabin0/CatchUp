import React from 'react'
import axios from 'axios';
import FormWrapper from '../FormWrapper'
import { useNavigate } from 'react-router-dom';
import { useInfoHandler } from '../../customhook/info';
import { IPlayerForm } from '../../data/ITypes';
import { backendBaseURL } from '../../data/utils';
import Message from '../../components/Message';
import PlayerFormCard from './PlayerForm';

const CreatePlayer = () => {
    const navigate = useNavigate();

    const { info, setInfo } = useInfoHandler();
  
    const createPlayer = async (data: any) => {
      try {
          const response = await axios.post(backendBaseURL + `/player/create`, data);
          console.log("Team created successfully:", response.data);
          setInfo(["Team created successfully!", "success"]);
          setTimeout(() => navigate("/player"), 1000);
      } catch (error: any) {
          console.error("Error creating team:", error);
          setInfo(["Error creating team", "error"])
      }
    };
  
    const onSubmit = (data: IPlayerForm) => {
        createPlayer(data)
    }

  return (
    <FormWrapper title="Add Player" ostyle="w-[35rem]">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <PlayerFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreatePlayer