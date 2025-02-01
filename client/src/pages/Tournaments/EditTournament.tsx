import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ITournamentForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Loading from "../../components/Loading";
import FormWrapper from "../FormWrapper";
import { useInfoHandler } from "../../customhook/info";
import Message from "../../components/Message";
import TournamentFormCard from "./TournamentForm";

const EditTournament = () => {
  const { tid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const navigate = useNavigate();
  const [data, setData] = useState<ITournamentForm | null>(null);

  useEffect(() => {
    if (tid) {
      axios.get(backendBaseURL + `/tournaments/${tid}`)
          .then((response) => {
            let tempData = response.data;
            tempData["end_date"] = tempData["end_date"].split('T')[0]
            tempData["start_date"] = tempData["start_date"].split('T')[0]
            setData(tempData);
        })
        .catch((error) => {
          setInfo(["Error fetching tournament data.", "error"]);
          console.error("Error fetching tournament data:", error);
        });
    }
  }, [tid]);

  const updateTournament = async (data: ITournamentForm) => {
    try {
      const response = await axios.put(backendBaseURL + `/tournaments/${tid}`, data);
      console.log("Tournament updated:", response.data);
      setInfo(["Tournament updated Successfully", "success"]);
      setTimeout(() => navigate("/tournaments/"), 1000);
    } catch (error) {
      setInfo(["Error updating tournament data.", "error"]);
      console.error("Error updating tournament:", error);
    }
  };

  const onSubmit = (d: ITournamentForm) => {
    if(data?.name === d.name && data?.start_date === d.start_date && data?.end_date === d.end_date) {
      setInfo(["No field changed", "error"]);
    }
    else if(Date.parse(d.start_date) < Date.parse(d.end_date)) {
        updateTournament(d);
    }
    else {
        setInfo(["Start date must be less than end date", "error"]);
    }
  }

  return (
    <FormWrapper title="Edit Tournament">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <TournamentFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }

    </FormWrapper>
  )
};

export default EditTournament;
