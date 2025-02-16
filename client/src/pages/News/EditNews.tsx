import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INewsForm } from "../../utils/ITypes";
import { AxiosGet, AxiosPut } from "../../utils/utils";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import NewsFormCard from "./NewsForm";
import { useDNavigate } from "../../customhook/dnavigate";

const EditNews = () => {
  const { newsid } = useParams(); 
  const { info, setInfo } = useInfoHandler();
  
  const { dnav } = useDNavigate();
  const [data, setData] = useState<INewsForm | null>(null);

  useEffect(() => {
    if (newsid) {
      AxiosGet(`/news/${newsid}`, setData, setInfo);
    }

  }, [newsid]);


  const updateNews = async (data: INewsForm) => {
    AxiosPut(`/news/${newsid}`, data, setInfo)
    dnav(`/news`, 100);
  };

  const onSubmit = (d: INewsForm) => {
    if(data?.title === d.title && data?.description === d.description) {
      setInfo(["No field changed", "error"]);
    }
    else {
      updateNews(d);
    }
  }

  return (
    <FormWrapper title="Edit News">
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }
      {data ? <NewsFormCard d={data} onSubmit={onSubmit} /> : <Loading /> }
    </FormWrapper>
  );
};

export default EditNews;

