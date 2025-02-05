import React, { useState, useEffect } from 'react'
import BasicDiv from '../components/BasicDiv'
import { ISideNavItem } from '../utils/ITypes'
import { _loggedInAdminItems } from '../data/_navItems'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import ThemeDiv from '../components/ThemeDiv'
import { getAllStats, getArray } from '../utils/utils'
import { getIcon } from '../components/Sidebar'
import Message from '../components/Message'
import { useInfoHandler } from '../customhook/info'
import ThemeLink from '../components/ThemeLink'
import { PiHandWavingFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";

// will hold the stasts to get all the information about the total stuffs in admin.
interface IAllStats {
  title: string,
  number: number,
};

const _tempArr = getArray(3);

const Dashboard = () => {

  const [links, setLinks] = useState<ISideNavItem[]>()
  const [stats, setStats] = useState<IAllStats[]>()
  const { info, setInfo } = useInfoHandler();

  useEffect(() => {
      setLinks(_loggedInAdminItems)
      getAllStats().then(val => setStats(val))
      setInfo(["Welcome Admin", "success"])
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full relative bg-theme-w">
      {info && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
      <div className="w-[95%] min-h-[90vh] bg-theme-w-alt rounded-xl p-10 my-10 space-y-10">
        <span className="uppercase text-3xl text-theme font-extrabold">
          {info ?<PiHandWavingFill className="h-10 w-10 mx-2 animate-pulse inline-block" /> : <MdDashboard className="h-10 w-10 mx-2 inline-block" />} Dashboard
        </span>
        <div className="flex flex-row justify-between flex-wrap">
          {
            stats ? stats.map((props, ind) => {
              return <StatsCard key={ind} {...props} />
            }): <Loading />
          }
        </div>
        <hr className="w-full border-2 border-theme my-10" />
        <h1 className="text-2xl font-extrabold text-theme-cont uppercase">Recents</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            links ? links.map(({label, url}, ind) => {
              return (
                <BasicDiv key={ind} ostyle="border bg-theme-w hover:border-theme rounded-md space-y-2 p-6">
                  <div className="w-full flex flex-row justify-between items-center text-xl space-x-2">
                    <h1 className="text-sm text-theme uppercase font-bold">{label}</h1>
                    <Link className="text-theme-cont hover:text-theme" to={`${url}/create`}><FaPlus /></Link>
                  </div>
                  <GetRecentItem />
                  <ThemeLink label="View All" url={url} ostyle="m-0 text-sm !p-1 !px-2 self-end" />
                </BasicDiv>
              )
            }) : <Loading />
          }
        </div>
      </div>
    </section>
  )
}

const GetRecentItem = () => {
  const items = _tempArr;

  return (
    <ol className="w-full flex flex-col justify-start items-start text-sm list-disc px-5">
      {
        items ? items.map((val, ind) => {
          return <li>Recent Item: {ind}</li>
        }) : <Loading />
      }
    </ol>
  )
}

const StatsCard = ({title, number}: IAllStats) => {
  return (
    <ThemeDiv ostyle="block bg-theme-cont rounded-xl min-h-[10rem] min-w-[25rem] flex flex-col justify-evenly items-center">
      <h2 className="text-md font-bold">{title}</h2>
      <div className="flex flex-row space-x-5">
        {getIcon(title, "h-10 w-10")}
        <h1 className="text-5xl font-extrabold">{number}</h1>
      </div>
    </ThemeDiv>
  )
}

export default Dashboard