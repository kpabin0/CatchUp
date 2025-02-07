import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { INewsForm, ISubNewsForm } from '../../utils/ITypes';
import { AxiosDelete, AxiosGet, checkAdminStatus } from '../../utils/utils';
import BasicDiv from '../../components/BasicDiv';
import Loading from '../../components/Loading';
import ThemeLink from '../../components/ThemeLink';
import { useInfoHandler } from '../../customhook/info';
import Message from '../../components/Message';
import { useDNavigate } from '../../customhook/dnavigate';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface INewsCard extends INewsForm {
  handlEdit?: (type: string, id: number) => void,
  handleDelete?: (type: string, id: number) => void
};

interface ISubNewsCard extends ISubNewsForm {
  handlEdit?: (type: string, id: number) => void,
  handleDelete?: (type: string, id: number) => void
};

const News = () => {

  const [newsData, setNewsData] = useState<INewsForm[]>();
  const [subNewsData, setSubNewsData] = useState<ISubNewsForm[]>();
  const { info ,setInfo } = useInfoHandler()
  const { dnav } = useDNavigate();
  const isAdmin = checkAdminStatus(); 

  
  useEffect(() => {
    AxiosGet(`/news`, setNewsData, setInfo);
    AxiosGet(`/subnews`, setSubNewsData, setInfo);

  // eslint-disable-next-line
  }, [])

  const handleDelete = async (type: string, id: number) => {
    AxiosDelete(`/${type}/${id}`, setInfo).then(() => {
      AxiosGet(`/news`, setNewsData, setInfo);
      AxiosGet(`/subnews`, setSubNewsData, setInfo);
    })
  };

  const handleEdit = (type: string, id: number) => {
    dnav(`/${type}/edit/${id}`, 100);
  };
  
  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full relative py-20">
      
      {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
      
      {isAdmin && <span className='absolute top-4 right-4 space-x-5'><ThemeLink label="Add News" url="/news/create" /><ThemeLink label="Add Sub News" url="/subnews/create" /></span>}
      
      <h1 className="text-theme text-3xl font-bold uppercase my-10">News</h1>
      <div className="min-w-[95%] grid xl:grid-cols-3 grid-cols-1 sm:gap-x-10">
        <div className="w-full xl:col-span-2 sm:p-10 p-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {
            newsData ? newsData.map((props, ind) => {
              return isAdmin ? <NewsCard key={ind} {...props} handleDelete={handleDelete} handlEdit={handleEdit} /> : <NewsCard key={ind} {...props} />
            }) : <Loading text="news" />
          }
        </div>
        <BasicDiv ostyle="w-full mx-auto xl:self-start space-y-2 mt-10">
          {
            subNewsData ? subNewsData.map((props, ind) => {
              return isAdmin ? <SubNewsCard key={ind} {...props} handlEdit={handleEdit} handleDelete={handleDelete} /> : <SubNewsCard key={ind} {...props} />
            }) : <Loading text="subnews" />
          }
        </BasicDiv>
      </div>
    </section>
  )
}

const NewsCard = ({newsid, title, img, description, handlEdit, handleDelete} : INewsCard) => {
  return (
    <BasicDiv ostyle="bg-white border rounded-lg shadow-md overflow-hidden relative">
      <div className='absolute top-1 right-1 flex flex-row'>
        {
          handlEdit ? <FaEdit 
                  onClick={() => handlEdit('news', newsid ? newsid : 0)}
                  className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
                  /> : <></>
        }
        {
          handleDelete ? <FaTrash 
                  onClick={() => handleDelete('news', newsid ? newsid : 0)}
                  className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-red text-theme-red hover:text-theme-w"
                /> : <></>
        }
      </div>
      <img
        src={"#"}
        alt={"news"}
        className="w-36 h-36 object-cover bg-theme-g"
      />
      <div className="w-full p-2">
        
        <h3 className="text-xl font-semibold text-theme-g mb-2">{title}: <span>{newsid}</span></h3>
        <p className="text-sm text-theme-g mb-4">{description}</p>
      </div>
      <span className="self-end pb-2"><ThemeLink label='Read More' url={`/news/${title}`} /></span>
    </BasicDiv>
  )
}

const SubNewsCard = ({subnewsid, title, description, handlEdit, handleDelete} : ISubNewsCard) => {
  return (
    <BasicDiv ostyle="w-full pt-2 bg-theme-w-alt border hover:border-theme relative" >
      <div className='absolute top-1 right-1 flex flex-row'>
        {
          handlEdit ? <FaEdit 
                  onClick={() => handlEdit('subnews', subnewsid ? subnewsid : 0)}
                  className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
                  /> : <></>
        }
        {
          handleDelete ? <FaTrash 
                  onClick={() => handleDelete('subnews', subnewsid ? subnewsid : 0)}
                  className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-red text-theme-red hover:text-theme-w"
                /> : <></>
        }
      </div>
      <span className="font-bold text-md">{title}: <span>{subnewsid}</span></span>
      
      <div className="w-full flex flex-row justify-between items-end">
        <p className="text-sm font-light p-2">{description}</p>
        <Link to={"#"} className="p-1 px-2 text-sm bg-theme-w hover:bg-theme text-theme hover:text-theme-w">More</Link>
      </div>
    </BasicDiv>
  )
}

export default News