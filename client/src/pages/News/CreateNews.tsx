import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AxiosPost } from '../../utils/utils';
import Message from '../../components/Message';
import { INewsForm } from '../../utils/ITypes';
import { useInfoHandler } from '../../customhook/info';
import FormWrapper from '../FormWrapper';
import NewsFormCard from './NewsForm';
import { useDNavigate } from '../../customhook/dnavigate';

const CreateNews = () => {

    const [type, setType] = useState("news");

    const { info, setInfo } = useInfoHandler();
    const curLoc = useLocation();
    const { dnav } = useDNavigate();

    const createNews = async (data: INewsForm) => {
        AxiosPost(`/${type}/create`, data, setInfo);
        dnav(`/news`);
    };

    useEffect(() => {
        setType(curLoc.pathname.split("/")[1])
    }, [])

    const onSubmit = (data: INewsForm) => {
        createNews(data);
    }

    return (
        <FormWrapper title="Create News">
            {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
            <NewsFormCard onSubmit={onSubmit} />  
        </FormWrapper>
    );
}

export default CreateNews

    