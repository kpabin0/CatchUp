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
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full py-20">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} /> }

        <BasicDiv ostyle="text-theme">
            <div className="w-[60%] flex flex-row space-x-10">
                <img className="max-w-[30rem] max-h-[20rem]" alt="TourImg" src={"/assets/bg.png"} />
                <div className="flex flex-col text-md space-y-2">
                    <h1 className="font-extrabold text-2xl uppercase">About {_about.name}</h1>
                    <h1 className="font-bold text-theme-cont">{_about.quote}</h1>
                    <h1 className="text-theme-g-alt pr-10 text-sm">{_about.description}</h1>
                    <span className="text-sm text-black my-2">Address: {_about.address}</span>
                    <h1 className="text-theme-g">Established: {_about.establishedIn}</h1>
                </div>
            </div>
            <hr className="w-full my-10 border border-theme"/>
            <div className="flex flex-row justify-evenly items-center space-x-5">
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
        <h1 className="text-xl text-theme-cont uppercase font-bold">Tournaments</h1>
          {
            tournaments ? tournaments.map((props, ind) => {
              return (
                <BasicDiv key={ind} ostyle={"w-full py-5 px-[5%] grid grid-cols-2 gap-10 text-center text-theme " + (ind % 2 === 0 ? " bg-theme-w-alt " : " bg-none")}>
                    <div className={" " + (ind % 2 === 0 ? " order-2 " : " brightness-50 ")}><img className="max-w-[30rem] max-h-[20rem]" alt="TourImg" src={"/assets/bg.png"} /></div>
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
        <BasicDiv ostyle="!items-start px-2 space-y-2">
            <span className="text-md inline-block">Id: {tournamentid}</span>
            <h1 className="text-xl font-bold uppercase py-2">{name}</h1>
            <span className="text-sm text-theme-g-alt inline-block"><b className="text-md font-bold">Start Date:</b> {start_date}</span>
            <span className="text-sm text-theme-g-alt inline-block"><b className="text-md font-bold">End Date:</b> {end_date}</span>
        </BasicDiv>
    )
}  

const PersonCard = ({name, img, post} : IPersonCard) => {
    return (
        <BasicDiv ostyle="min-w-[20rem] min-h-[20rem] hover:bg-theme-cont hover:text-theme-w pb-5">
            <div className="w-full h-[15rem] bg-theme-g">{img?<img src={img} alt={name} /> : <></>}</div>
            <span className="font-bold text-xl">{name}</span>
            <span className="font-light text-sm">{post}</span>
        </BasicDiv>
    )
}

export default AboutUs