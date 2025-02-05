import { Link, useNavigate } from 'react-router-dom'
import { _loggedInAdminItems, _loggedInUserItems, _navItems } from '../data/_navItems'
import { useEffect, useState } from 'react'
import { TbMenu, TbHome, TbCricket, TbTrophy, TbNews, TbBallTennis, TbLogout, TbPlus, TbEdit, TbLogin, TbBinoculars, TbBrandTeams, TbUser, TbHome2, TbQuestionMark } from "react-icons/tb";
import { ISideNavItem } from '../utils/ITypes';
import { checkAdminStatus, loggedInStatus } from '../utils/utils';
import Logo from './Logo';

const iconStyle = 'inline-block m-2 h-5 w-5'

export function getIcon(name : string, style: string = iconStyle)
{
    switch(name)
    {
        case "Home":
            return <TbHome className={style} />;
        case "Matches":
            return <TbCricket className={style} />
        case "Tournaments":
            return <TbTrophy className={style} />
        case "News":
            return <TbNews className={style} />
        case "Fixtures":
            return <TbBallTennis className={style} />
        case "Watchlist":
            return <TbBinoculars className={style} />
        case "Teams":
            return <TbBrandTeams className={style} />
        case "Players":
            return <TbUser className={style} />
        case "Venues":
            return <TbHome2 className={style} />
        case "About Us":
            return <TbQuestionMark className={style} />

        case "Create Team":
        case "Create Tournament":
            return <TbPlus className={style} />

        case "Edit Team":
        case "Edit Tournaments":
            return <TbEdit className={style} />
        
        default:
            return;
    }
}

const Sidebar = () => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const [sideNavItems, setSideNavItems] = useState<ISideNavItem[]>();

    const handleLogInOut = () => {
        if(!isLoggedIn)
        {
            console.log("Not Logged in")
        }
        else
        {
            localStorage.setItem("loggedIn", String(false))
            setIsLoggedIn(!isLoggedIn)
        }
        navigate("/login")
        window.location.reload()
    }

    useEffect(() => {
        setIsLoggedIn(loggedInStatus())
        setIsAdmin(checkAdminStatus())
        // eslint-disable-next-line
    }, [])
  
    useEffect(() => {
        setSideNavItems(!isLoggedIn ? _navItems : !isAdmin ? _loggedInUserItems : _loggedInAdminItems)

    }, [isLoggedIn, isAdmin])


  return (
    <>
    <nav className={"fixed top-0 left-0 w-[20rem] h-screen flex flex-col justify-center bg-theme-w text-theme z-40 shadow-xl transition-transform duration-300 "  + (shouldOpen ? ' translate-x-[0] ' : ' translate-x-[-100%] ')}>
        <div className="w-full py-20 text-left flex flex-col justify-center">
        <Logo ostyle="h-[2rem] mx-auto my-4" />
        {
            sideNavItems?.map(({label, url}, ind) => {
                return <SideItem key={ind} label={label} url={url} icon={getIcon(label)} />
            })
        }
        <button 
            onClick={handleLogInOut}
            className="w-full flex flex-row items-center px-[10%] space-x-4 text-md py-5 uppercase font-bold hover:bg-theme-w-alt hover:text-theme-red"
            >
        {
            isLoggedIn ? <><TbLogout className={iconStyle} />Logout</> : <><TbLogin className={iconStyle} />Login</>
        }
        </button>
        </div>


    </nav>
    <button 
        onClick={() => setShouldOpen(!shouldOpen)}
        className={'fixed top-0 left-0 z-50 rounded-[50%] m-2 p-2 text-theme-w bg-theme border border-theme-w'} 
    >
        <TbMenu className='w-5 h-5' />
    </button>
    </>
  )
}

const SideItem = ({label, url, style, icon} : ISideNavItem) => {
    return (
        <Link 
            to={url} 
            className={`w-full px-[10%] text-md py-4 uppercase font-bold hover:bg-theme-w-alt hover:px-[15%] transition-all duration-300 ${style}`}
        >
            {icon ? icon : <></>}
            {label}
        </Link>
    )
}

export default Sidebar

