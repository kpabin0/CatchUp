import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITournamentForm } from "../../data/ITypes";
import { AxiosGet, AxiosPut } from "../../data/utils";
import Loading from "../../components/Loading";
import FormWrapper from "../FormWrapper";
import { useInfoHandler } from "../../customhook/info";
import Message from "../../components/Message";
import TournamentFormCard from "./TournamentForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditTournament = () => {
  const { tid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate()
  
  const [data, setData] = useState<ITournamentForm | null>(null);

  useEffect(() => {
    if (tid) {
      const forwardData = (d: any) => {
        let temp = d;
        temp["end_date"] = temp["end_date"].split('T')[0]
        temp["start_date"] = temp["start_date"].split('T')[0]
        setData(temp);
      }

      AxiosGet(`/tournaments/${tid}`, forwardData, setInfo);
    }

  }, [tid]);

  const updateTournament = async (data: ITournamentForm) => {
    AxiosPut(`/tournaments/${tid}`, data, setInfo);
    dnav(`/tournaments`, 1000);
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
