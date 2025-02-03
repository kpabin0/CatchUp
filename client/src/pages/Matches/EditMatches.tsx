import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMatchForm } from "../../utils/ITypes";
import { AxiosGet, AxiosPut } from "../../utils/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import MatchFormCard from "./MatchForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditMatch = () => {
  const { matchid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  const [data, setData] = useState<IMatchForm | null>(null);

  useEffect(() => {
    if (matchid) {
      AxiosGet(`/matches/${matchid}`, setData, setInfo);
    }

  }, [matchid]);


  const updateMatch = async (data: IMatchForm) => {
    AxiosPut(`/matches/${matchid}`, data, setInfo);
    dnav(`/matches`, 1000);
  };

  const onSubmit = (d: IMatchForm) => {
      updateMatch(d);
  }

  return (
    <FormWrapper title="Edit Match">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <MatchFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>

  );
  
};

export default EditMatch;


