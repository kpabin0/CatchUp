import React, { useState, useEffect } from 'react'
import BasicDiv from '../components/BasicDiv'
import ThemeLink from '../components/ThemeLink'
import { ISideNavItem } from '../data/ITypes'
import { _loggedInAdminItems } from '../data/_navItems'
import Loading from '../components/Loading'

const Dashboard = () => {

  const [links, setLinks] = useState<ISideNavItem[]>()

  useEffect(() => {
      setLinks(_loggedInAdminItems)
  }, [])

  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full relative">
      <span className='absolute top-4 right-4'>Welcome Admin</span>
      <BasicDiv>
        <span className="uppercase text-3xl text-theme font-extrabold">Dashboard</span>
        <span>Quick Controls</span>
      </BasicDiv>
      <div className="grid grid-cols-4 gap-8">
        {
          links ? links.map(({label, url}) => {
            return (
              <BasicDiv ostyle="border hover:border-theme space-y-3 p-6">
                <h1 className="text-xl text-theme uppercase font-bold ">{label}</h1>
                <span>Options</span>
                <ThemeLink label="View" url={`${url}`} />
                <ThemeLink label="Create" url={`${url}/create`} />
              </BasicDiv>
            )
          }) : <Loading />
        }
      </div>
    </section>
  )
}

export default Dashboard