import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { INews, ISubNews } from '../data/ITypes';
import { backendBaseURL } from '../data/utils';
import BasicDiv from '../components/BasicDiv';
import Loading from '../components/Loading';

const News = () => {

  const [newsData, setNewsData] = useState<INews[]>();
  const [subNewsData, setSubNewsData] = useState<ISubNews[]>();

  
  useEffect(() => {
    const res = async () => {

      // eslint-disable-next-line
      const news =  await fetch(backendBaseURL + `/news/`)
                    .then((res) => res.json())
                    .then((data) => { setNewsData(data); console.log(data); return data })
                    .catch((error) => { console.log(error); });
                    
      // eslint-disable-next-line
      const subNews =  await fetch(backendBaseURL + `/subnews/`)
                    .then((res) => res.json())
                    .then((data) => { setSubNewsData(data); console.log(data); return data })
                    .catch((error) => { console.log(error); });

    }

    res();
  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1 className="text-theme text-3xl font-bold uppercase my-10">News</h1>
        <div className="w-[80%] flex flex-col xl:flex-row justify-evenly items-center flex-wrap">
          <div className="flex flex-row flex-wrap justify-evenly items-center">
            {
              newsData ? newsData.map((props, ind) => {
                return <NewsCard key={ind} {...props} />
              }) : <Loading text="news" />
            }
          </div>
          <hr className="w-full border border-theme my-10"/>
          <BasicDiv ostyle="space-y-2 my-4">
            {
              subNewsData ? subNewsData.map((props, ind) => {
                return <SubNewsCard key={ind} {...props} />
              }) : <Loading text="subnews" />
            }
          </BasicDiv>
        </div>
    </section>
  )
}

const NewsCard = ({title, img, description} : INews) => {
  return (
    <BasicDiv ostyle="p-2 space-y-6 justify-center">
      <h1 className="text-xl font-main-a font-bold">{title}</h1>
      <div className="rounded-xl w-[20rem] h-[15rem] bg-theme-g">
        { img ? <img className="rounded-xl w-full h-full" src={img} alt={title} /> : <></>}
      </div>
      <p className="font-light">{description}</p>
    </BasicDiv>
  )
}

const SubNewsCard = ({title, url, description} : ISubNews) => {
  return (
    <BasicDiv ostyle="w-full pt-2 bg-theme-w-alt border hover:border-theme" >
      <span className="font-bold text-md">{title}</span>
      <div className="w-full flex flex-row justify-between items-end">
        <p className="text-sm font-light p-2">{description}</p>
        <Link to={url ? url : "#"} className="p-1 px-2 bg-theme-w hover:bg-theme text-theme hover:text-theme-w">More</Link>
      </div>
    </BasicDiv>
  )
}

export default News