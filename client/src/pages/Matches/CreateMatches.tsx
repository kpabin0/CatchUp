import React from 'react'
import axios from 'axios';
import FormWrapper from '../FormWrapper';
import MatchFormCard from './MatchForm';
import { IMatchForm } from '../../data/ITypes';
import { backendBaseURL } from '../../data/utils';
import { useInfoHandler } from '../../customhook/info';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';

const CreateMatch = () => {

    const navigate = useNavigate();

    const { info, setInfo } = useInfoHandler();
  
    const createMatch = async (data: any) => {
      try {
          const response = await axios.post(backendBaseURL + `/matches/create`, data);
          console.log("Match created successfully:", response.data);
          setInfo(["Match created successfully!", "success"]);
          setTimeout(() => navigate("/matches"), 1000);
      } catch (error: any) {
          console.error("Error creating match:", error);
          setInfo(["Error creating match", "error"])
      }
    };
  
    const onSubmit = (data: IMatchForm) => {
        createMatch(data)
    }

  return (
    <FormWrapper title="Add Team">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <MatchFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreateMatch