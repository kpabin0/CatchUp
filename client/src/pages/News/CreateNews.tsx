import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { backendBaseURL } from '../../data/utils';
import axios from 'axios';
import Message from '../../components/Message';
import { INewsForm } from '../../data/ITypes';
import { useInfoHandler } from '../../customhook/info';
import FormWrapper from '../FormWrapper';
import NewsFormCard from './NewsForm';

const CreateNews = () => {

    const [type, setType] = useState("news");

    const { info, setInfo } = useInfoHandler();
    const curLoc = useLocation();
    const navigate = useNavigate();

    const createNews = async (data: INewsForm) => {
        try {
            const response = await axios.post(backendBaseURL + `/${type}/create`, data);  // Backend API URL
            console.log(`${type} created:`, response.data);
            setInfo([`${type} created successfully!`, "success"]);
            setTimeout(() => navigate("/news"), 1000);
        } catch (error:any) {
            console.error(`Error creating ${type}`, error.response);
            setInfo([`Error creating ${type}`, "error"])
        }
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

    