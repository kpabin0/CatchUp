import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { INews, ISubNews } from '../../utils/ITypes';
import { AxiosGet, checkAdminStatus } from '../../utils/utils';
import BasicDiv from '../../components/BasicDiv';
import Loading from '../../components/Loading';
import ThemeLink from '../../components/ThemeLink';
import { useInfoHandler } from '../../customhook/info';
import Message from '../../components/Message';

const News = () => {

  const [newsData, setNewsData] = useState<INews[]>();
  const [subNewsData, setSubNewsData] = useState<ISubNews[]>();
  const { info ,setInfo } = useInfoHandler()
  const isAdmin = checkAdminStatus(); 

  
  useEffect(() => {
    AxiosGet(`/news`, setNewsData, setInfo);
    AxiosGet(`/subnews`, setSubNewsData, setInfo);

  // eslint-disable-next-line
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full relative pt-20">
      
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
      
      {isAdmin && <span className='absolute top-4 right-4'><ThemeLink label="Add News" url="/news/create" /></span>}
      
      <h1 className="text-theme text-3xl font-bold uppercase my-10">News</h1>
      <div className="min-w-[95%] grid xl:grid-cols-3 grid-cols-1 gap-x-10">
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