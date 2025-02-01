import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ITeamForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import TeamFormCard from "./TeamForm";

const EditTeam = () => {
  const { teamid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const navigate = useNavigate();
  const [data, setData] = useState<ITeamForm | null>(null);

  useEffect(() => {
    if (teamid) {
      axios.get(`${backendBaseURL}/teams/${teamid}`)
        .then((response) => {
          setData(response.data); 
        })
        .catch((error) => {
          setInfo(["Error fetching team data.", "error"]);
          console.error("Error fetching team data:", error);
        });
    }
  }, [teamid]);


  const updateTeam = async (data: ITeamForm) => {
    try {
      const response = await axios.put(`${backendBaseURL}/teams/${teamid}`, data);
      console.log("Team updated:", response.data);
      setInfo(["Team updated Successfully", "success"]);
    } catch (error) {
      setInfo(["Error updating team data.", "error"]);
      console.error("Error updating team:", error);
    }
    setTimeout(() => {  navigate("/teams") }, 1000);
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


