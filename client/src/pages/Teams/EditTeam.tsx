import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITeamForm } from "../../utils/ITypes";
import { AxiosGet, AxiosPut } from "../../utils/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import TeamFormCard from "./TeamForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditTeam = () => {
  const { teamid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const { dnav } = useDNavigate();
  const [data, setData] = useState<ITeamForm | null>(null);

  useEffect(() => {
    if (teamid) {
      AxiosGet(`/teams/${teamid}`, setData, setInfo);
    }

  }, [teamid]);


  const updateTeam = async (data: ITeamForm) => {
    AxiosPut(`/teams/${teamid}`, data, setInfo)
    dnav(`/teams`, 100);
  };

  const onSubmit = (d: ITeamForm) => {
    if(data?.name === d.name && data?.description === d.description) {
      setInfo(["No field changed", "error"]);
    }
    else {
      updateTeam(d);
    }
  }

  return (
    <FormWrapper title="Edit Team">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <TeamFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>
  );
};

export default EditTeam;