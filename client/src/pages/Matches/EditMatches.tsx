import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IMatchForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import MatchFormCard from "./MatchForm";

const EditMatch = () => {
  const { matchid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const navigate = useNavigate();
  const [data, setData] = useState<IMatchForm | null>(null);

  useEffect(() => {
    if (matchid) {
      axios.get(`${backendBaseURL}/matches/${matchid}`)
        .then((response) => {
          setData(response.data); 
        })
        .catch((error) => {
          setInfo(["Error fetching match data.", "error"]);
          console.error("Error fetching match data:", error);
        });
    }
  }, [matchid]);


  const updateMatch = async (data: IMatchForm) => {
    try {
      const response = await axios.put(`${backendBaseURL}/matches/${matchid}`, data);
      console.log("match updated:", response.data);
      setInfo(["match updated Successfully", "success"]);
    } catch (error) {
      setInfo(["Error updating match data.", "error"]);
      console.error("Error updating match:", error);
    }
    setTimeout(() => {  navigate("/matches") }, 1000);
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


