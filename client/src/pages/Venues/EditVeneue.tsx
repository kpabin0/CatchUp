import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVenueForm } from "../../data/ITypes";
import { AxiosGet, AxiosPut } from "../../data/utils";
import Loading from "../../components/Loading";
import FormWrapper from "../FormWrapper";
import { useInfoHandler } from "../../customhook/info";
import Message from "../../components/Message";
import VeneueFormCard from "./VenueForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditVenue = () => {
  
  const { venueid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();
  
  const [data, setData] = useState<IVenueForm | null>(null);

  useEffect(() => {
    console.log(venueid)
    if (venueid) {
      AxiosGet(`/venues/${venueid}`, setData, setInfo);
    }
  }, [venueid]);

  const updateVenue = async (data: IVenueForm) => {
    AxiosPut(`/venues/${venueid}`, data, setInfo);
    dnav("/venues", 1000);
  };

  const onSubmit = (d: IVenueForm) => {
    updateVenue(d);
  }

  return (
    <FormWrapper title="Edit Venue">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
        {data ? <VeneueFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>
  )
};

export default EditVenue;
