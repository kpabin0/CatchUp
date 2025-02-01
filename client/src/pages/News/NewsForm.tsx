import React, { useEffect, useState } from 'react'
import ThemeInputField from '../../components/ThemeInputField';
import { INewsForm } from '../../data/ITypes';

interface INewsFormCard {
    d?: INewsForm,
    onSubmit: (d: INewsForm) => void
};

const NewsFormCard = ({d, onSubmit}: INewsFormCard) => {

    const [data, setData] = useState<INewsForm>({
        newsid: 0,
        title: '',
        img: '',
        description: ''
    });


    useEffect(() => {
    if(d) {
        setData(d);
    }

    }, [d]);
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
        ...data,
        [e.target.name]: e.target.value
        });
    }  

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    }

    const formReset = (e: React.FormEvent) => {
        e.preventDefault();
        setData({
            newsid: data.newsid,
            title: '',
            img: '',
            description: ''
        })
    }

    return (
        <form onSubmit={formSubmit} onReset={formReset} className="">
            <ThemeInputField 
                label="Title"
                type="string"
                name="title"
                placeholder="Enter title here"
                value={data.title}
                onInputChange={onInputChange}
            />
            <ThemeInputField 
                label="Image URL"
                type="text"
                name="img"
                placeholder="Enter image url here"
                value={data.img}
                onInputChange={onInputChange}
            />
            <ThemeInputField
                label="Description" 
                type="text"
                name="description"
                placeholder="Enter description here"
                value={data.description}
                onInputChange={onInputChange}
            />

            <button
                type="submit"
                className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
            >
                Submit
            </button>
            <button
                type="reset"
                className="mx-2 bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
            >
                Clear
            </button>
        </form>
    );
}

export default NewsFormCard

    