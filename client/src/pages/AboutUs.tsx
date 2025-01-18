import React, { useEffect, useState } from 'react'
import { _about } from '../data/_about'
import { getFallbackTournamentInfo } from '../data/_tournaments'

interface ITournamentInfo   {
    name: string,
    start: string,
    end: string,
    venue: string,
    description: string,
};

const AboutUs = () => {
  
    const [tournament, setTournament] = useState<ITournamentInfo[]>()
    const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

    useEffect(() => {
        const res = async () => {
        return await fetch(`http://localhost:${PORT_NUMBER}/tournamentinfo`)
                        .then((res) => res.json())
                        .then((data) => { setTournament(data); console.log(data); return data })
                        .catch((error) => { setTournament(getFallbackTournamentInfo()); console.log(error); });
        }
        res();
        
    // eslint-disable-next-line
    }, [])

    return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1 className="text-xl text-theme-g font-bold mt-20 uppercase">About Us</h1>
        
        <div className="flex flex-col justify-evenly items-center">
            <h1 className="font-extrabold text-6xl text-theme my-2 uppercase">{_about.name}</h1>
            <h1 className="font-bold text-xl text-theme-alt my-2">{_about.quote}</h1>
            <h1 className="text-xl text-theme-g my-2">Established in : {_about.establishedIn}</h1>
            <span className="text-md text-theme my-2">Address {_about.address}</span>
            <div className="grid grid-cols-3 gap-5 mt-20">
                {
                    _about.personals.map(({post, name, img}) => {
                        return (
                            <div className="min-w-[20rem] min-h-[20rem] flex flex-col justify-between items-center hover:bg-theme hover:text-white pb-5">
                                <div className="w-full h-[15rem] bg-theme-g">{img?<img src={img} alt={name} /> : <></>}</div>
                                <span className="font-bold text-xl">{name}</span>
                                <span className="font-light text-sm">{post}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <hr className="w-full  my-10 border border-theme"/>
        
        <div className="my-10 grid grid-cols-1 gap-10 text-center">
          {
            tournament ? tournament?.map(({name, start, end, venue, description}, ind) => {
              return (
                <div className={"w-full py-10 px-[5%] grid grid-cols-2 gap-10 text-center " + (ind % 2 === 0 ? " bg-theme text-theme-w " : " bg-none text-theme")}>
                    <div className={"w-[30rem] h-[20rem] bg-theme-g " + (ind % 2 === 0 ? " order-2 " : " ")}></div>
                    <TournamentInfoCard name={name} start={start} end={end} venue={venue} description={description} />
                </div>
              )
            }) : <span className="text-3xl text-theme ">Loading...</span>
          }
        </div>
    </section>
  )
}


const TournamentInfoCard = ({name, start, end, venue, description} : ITournamentInfo) => {
    return (
        <>
        <div className="">
            <h1 className="text-xl font-bold uppercase text-center py-2 order-1">{name}</h1>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Start Date:</b> {start}</span>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">End Date:</b> {end}</span>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Venue:</b> {venue}</span>
            <p className="font-extralight text-[0.80rem] text-center inline-block m-2">{description}</p>
        </div>
        </>
    )
}   

export default AboutUs