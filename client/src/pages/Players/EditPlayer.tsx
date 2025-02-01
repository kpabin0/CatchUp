
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IPlayerForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import PlayerFormCard from "./PlayerForm";

const EditPlayer = () => {
  const { pid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const navigate = useNavigate();
  const [data, setData] = useState<IPlayerForm | null>(null);

  useEffect(() => {
    if (pid) {
      axios.get(`${backendBaseURL}/Players/${pid}`)
        .then((response) => {
          setData(response.data); 
        })
        .catch((error) => {
          setInfo(["Error fetching player data.", "error"]);
          console.error("Error fetching player data:", error);
        });
    }
  }, [pid]);


  const updatePlayer = async (data: IPlayerForm) => {
    try {
      const response = await axios.put(`${backendBaseURL}/players/${pid}`, data);
      console.log("Player updated:", response.data);
      setInfo(["Player updated Successfully", "success"]);
    } catch (error) {
      setInfo(["Error updating player data.", "error"]);
      console.error("Error updating player:", error);
    }
    setTimeout(() => {  navigate("/players") }, 1000);
  };

  const onSubmit = (d: IPlayerForm) => {
      updatePlayer(d);
  }

  return (
    <FormWrapper title="Edit Player">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <PlayerFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>

  );
  
};

export default EditPlayer;

