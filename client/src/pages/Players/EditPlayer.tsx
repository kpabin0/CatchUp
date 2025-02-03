
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IPlayerForm } from "../../data/ITypes";
import { AxiosGet, AxiosPost, backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import PlayerFormCard from "./PlayerForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditPlayer = () => {
  const { pid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const { dnav } = useDNavigate();
  const [data, setData] = useState<IPlayerForm | null>(null);

  useEffect(() => {
    if (pid) {
      AxiosGet(`/players/${pid}`, setData, setInfo);
    }

  }, [pid]);


  const updatePlayer = async (data: IPlayerForm) => {
    AxiosPost(`players/${pid}`, data, setInfo);
    dnav("/players", 1000);
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

