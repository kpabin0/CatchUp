import React, { useEffect, useState } from 'react'

interface INews {
  title: string,
  img?: string,
  description: string
};

const _subNews = [1, 2, 3, 4, 5];

const News = () => {

  const [newsData, setNewsData] = useState<INews[]>();

  useEffect(() => {
    const res = async () => {
      return await fetch("http://localhost:8080/news/")
                    .then((res) => res.json())
                    .then((data) => { setNewsData(data); console.log(data); return data })
                    .catch((error) => console.log(error));
    }

    res();
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1>News</h1>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3 grid grid-cols-2 gap-10">
            {
              newsData ? newsData?.map(({title, img, description}, ind) => {
                return <NewsCard key={ind} title={title} img={img} description={description} />
              }) : <span className="text-3xl text-theme ">Loading...</span>
            }
          </div>
          <div className="flex flex-col items-center">
              {
                _subNews.map((val, ind) => {
                  return <span className="block my-2">Sub News {ind + 1}</span>
                })
              }
          </div>
        </div>
    </section>
  )
}

const NewsCard = ({title, img, description} : INews) => {
  return (
    <div className="p-2 space-y-6 flex flex-col ">
      <h1 className="text-xl font-main text-theme">{title}</h1>
      { img ? <img className="rounded-xl w-[20rem] h-[15rem]" src={img} alt={title} /> : <div className="rounded-xl w-[20rem] h-[15rem] bg-theme"></div>}
      <p className="text-black">{description}</p>
    </div>
  )
}

export default News