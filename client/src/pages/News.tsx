import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface INews {
  title: string,
  img?: string,
  description: string
};

interface ISubNews {
  title: string,
  url?: string,
  description: string
};

function getFallbackNews()
{
  const tempNews = [1, 2, 3, 4, 5];
  return tempNews.map((val) => {
    return {
      title: "Fallback News Title : " + val.toString(),
      description: "This is the place for description of news..... " + val.toString() 
    }
  })
}

function getFallbackSubNews()
{
  const tempSubNews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return tempSubNews.map((val) => {
    return {
      title: "Fallback Sub News Title : " + val.toString(),
      url: "#",
      description: "This is short sub news desc..... just some text to fill the place" + val.toString() 
    }
  })
}

const News = () => {

  const [newsData, setNewsData] = useState<INews[]>();
  const [subNewsData, setSubNewsData] = useState<ISubNews[]>();

  const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;
  
  useEffect(() => {
    const res = async () => {

      // eslint-disable-next-line
      const news =  await fetch(`http://localhost:${PORT_NUMBER}/news/`)
                    .then((res) => res.json())
                    .then((data) => { setNewsData(data); console.log(data); return data })
                    .catch((error) => { setNewsData(getFallbackNews()); console.log(error); });
                    
      // eslint-disable-next-line
      const subNews =  await fetch(`http://localhost:${PORT_NUMBER}/subnews/`)
                    .then((res) => res.json())
                    .then((data) => { setSubNewsData(data); console.log(data); return data })
                    .catch((error) => { setSubNewsData(getFallbackSubNews()); console.log(error); });

    }

    res();
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1 className="text-theme text-3xl font-bold uppercase my-10">News</h1>
        <div className="min-w-[80%] max-w-[90%] grid grid-cols-4 gap-2 m-10">
          <div className="col-span-3 grid grid-cols-2 gap-10">
            {
              newsData ? newsData?.map(({title, img, description}, ind) => {
                return <NewsCard key={ind} title={title} img={img} description={description} />
              }) : <span className="text-3xl text-theme ">Loading...</span>
            }
          </div>
          <div className="max-col-span-1 grid gap-4 ">
            {
              subNewsData ? subNewsData?.map(({title, url, description}) => {
                return <SubNewsCard key={title} title={title} url={url} description={description} />
              }) :  <span className="text-1xl text-theme ">Loading...</span>
            }
          </div>
        </div>
    </section>
  )
}

const NewsCard = ({title, img, description} : INews) => {
  return (
    <div className="p-2 space-y-6 flex flex-col justify-center">
      <h1 className="text-xl font-main-a font-bold">{title}</h1>
      <div className="rounded-xl w-[25rem] h-[20rem] bg-theme-g">
        { img ? <img className="rounded-xl w-full h-full" src={img} alt={title} /> : <></>}
      </div>
      <p className="font-light">{description}</p>
    </div>
  )
}

const SubNewsCard = ({title, url, description} : ISubNews) => {
  return (
    <div className="w-full pt-2 flex flex-col justify-between items-center bg-theme-w-alt border hover:border-theme" >
      <span className="font-bold text-md">{title}</span>
      <div className="w-full flex flex-row justify-between items-end">
        <p className="text-sm font-light p-2">{description}</p>
        <Link to={url ? url : "#"} className="p-1 px-2 bg-theme-w hover:bg-theme text-theme hover:text-theme-w">More</Link>
      </div>
    </div>
  )
}

export default News