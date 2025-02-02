import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IVenueForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
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
      axios.get(backendBaseURL + `/venues/${venueid}`)
          .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
          setInfo(["Error fetching venue data.", "error"]);
          console.error("Error fetching venue data:", error);
        });
    }
  }, [venueid]);

  const updateVenue = async (data: IVenueForm) => {
    try {
      const response = await axios.put(backendBaseURL + `/venues/${venueid}`, data);
      console.log("Venue updated:", response.data);
      setInfo(["Venue updated Successfully", "success"]);
      dnav("/venues", 1000);
    } catch (error) {
      setInfo(["Error updating venue data.", "error"]);
      console.error("Error updating venue:", error);
    }
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
