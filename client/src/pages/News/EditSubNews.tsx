import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISubNewsForm } from "../../utils/ITypes";
import { AxiosGet, AxiosPut } from "../../utils/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import { useDNavigate } from "../../customhook/dnavigate";
import NewsFormCard from "./NewsForm";

const EditSubnews = () => {
  const { subnewsid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const { dnav } = useDNavigate();
  const [data, setData] = useState<ISubNewsForm | null>(null);

  useEffect(() => {
    if (subnewsid) {
      AxiosGet(`/subnews/${subnewsid}`, setData, setInfo);
    }

  }, [subnewsid]);


  const updateSubnews = async (data: ISubNewsForm) => {
    AxiosPut(`/subnews/${subnewsid}`, data, setInfo)
    dnav(`/subnews`, 100);
  };

  const onSubmit = (d: ISubNewsForm) => {
    if(data?.title === d.title && data?.description === d.description) {
      setInfo(["No field changed", "error"]);
    }
    else {
      updateSubnews(d);
    }
  }

  return (
    <FormWrapper title="Edit Subnews">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <NewsFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>
  );
};

export default EditSubnews;

