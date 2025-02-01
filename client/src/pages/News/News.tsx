import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { INews, ISubNews } from '../../data/ITypes';
import { backendBaseURL } from '../../data/utils';
import BasicDiv from '../../components/BasicDiv';
import Loading from '../../components/Loading';
import ThemeLink from '../../components/ThemeLink';

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
        
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-x-10">
          <div className="w-full xl:col-span-2 p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {
              newsData ? newsData.map((props, ind) => {
                return <NewsCard key={ind} {...props} />
              }) : <Loading text="news" />
            }
          </div>
          <BasicDiv ostyle="w-full mx-auto xl:self-start space-y-2 mt-10">
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
    <BasicDiv ostyle="bg-white border rounded-lg shadow-md overflow-hidden">
      <img
        src={"#"}
        alt={"news"}
        className="w-36 h-36 object-cover bg-theme-g"
      />
      <div className="w-full p-2">
        <h3 className="text-xl font-semibold text-theme-g mb-2">{title}</h3>
        <p className="text-sm text-theme-g mb-4">{description}</p>
      </div>
      <span className="self-end pb-2"><ThemeLink label='Read More' url={`/news/${title}`} /></span>
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