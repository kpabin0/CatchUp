import React, { useEffect, useState } from 'react'
import { _about } from '../data/_about'
import { ITournament } from "../utils/ITypes";
import { AxiosGet } from '../utils/utils';
import { IPersonCard } from '../utils/ITypes';
import BasicDiv from '../components/BasicDiv';
import Loading from '../components/Loading';
import { useInfoHandler } from '../customhook/info';
import Message from '../components/Message';

const AboutUs = () => {
  
    const [tournaments, setTournaments] = useState<ITournament[]>();
    const [person, setPerson] = useState<IPersonCard[]>();
    const { info, setInfo } = useInfoHandler();

    useEffect(() => {
        AxiosGet(`/tournaments`, setTournaments, setInfo);
        AxiosGet(`/about`, setPerson, setInfo);

    // eslint-disable-next-line
    }, [])

    return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
        <h1 className="text-xl text-theme-g font-bold mt-20 uppercase">About Us</h1>

        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }

        <BasicDiv>
            <h1 className="font-extrabold text-6xl text-theme my-2 uppercase">{_about.name}</h1>
            <h1 className="font-bold text-xl text-theme-alt my-2">{_about.quote}</h1>
            <h1 className="text-xl text-theme-g my-2">Established in : {_about.establishedIn}</h1>
            <span className="text-md text-theme my-2">Address {_about.address}</span>
            <div className="flex flex-row justify-evenly items-center space-x-5 mt-20">
                {
                    person ? person.map((props, ind) => {
                        return (
                            <PersonCard key={ind} {...props} />
                        )
                    }) : <Loading text="personals" />
                }
            </div>
        </BasicDiv>
        <hr className="w-full my-10 border border-theme"/>
        <div className="w-full grid grid-cols-1 gap-10 text-center">
          {
            tournaments ? tournaments.map((props, ind) => {
              return (
                <BasicDiv ostyle={"w-full py-10 px-[5%] grid grid-cols-2 gap-10 text-center " + (ind % 2 === 0 ? " bg-theme text-theme-w " : " bg-none text-theme")}>
                    <div className={"w-[30rem] h-[20rem] bg-theme-g " + (ind % 2 === 0 ? " order-2 " : " ")}></div>
                    <TournamentInfoCard {...props} />
                </BasicDiv>
              )
            }) : <Loading />
          }
        </div>
    </section>
  )
}


const TournamentInfoCard = ({tournamentid, name, start_date, end_date} : ITournament) => {
    return (
        <BasicDiv>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Id:</b> {tournamentid}</span>
            <h1 className="text-xl font-bold uppercase text-center py-2">Name: {name}</h1>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">Start Date:</b> {start_date}</span>
            <span className="font-extralight text-[0.80rem] text-center inline-block m-2"><b className="text-md font-bold">End Date:</b> {end_date}</span>
        </BasicDiv>
    )
}  

const PersonCard = ({name, img, post} : IPersonCard) => {
    return (
        <BasicDiv ostyle="min-w-[20rem] min-h-[20rem] hover:bg-theme hover:text-theme-w pb-5">
            <div className="w-full h-[15rem] bg-theme-g">{img?<img src={img} alt={name} /> : <></>}</div>
            <span className="font-bold text-xl">{name}</span>
            <span className="font-light text-sm">{post}</span>
        </BasicDiv>
    )
}

export default AboutUs