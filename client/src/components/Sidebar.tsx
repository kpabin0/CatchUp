import { Link, useNavigate } from 'react-router-dom'
import { _loggedInAdminItems, _loggedInUserItems, _navItems } from '../data/_navItems'
import { useEffect, useState } from 'react'
import { TbMenu, TbHome, TbCricket, TbTrophy, TbNews, TbBallTennis, TbLogout, TbPlus, TbEdit, TbLogin, TbBinoculars } from "react-icons/tb";
import { ISideNavItem } from '../data/ITypes';
import { checkAdminStatus, loggedInStatus } from '../data/utils';

const iconStyle = 'inline-block m-2 h-5 w-5'

function getIcon(name : string)
{
    switch(name)
    {
        case "Home":
            return <TbHome className={iconStyle} />;
        case "Matches":
            return <TbCricket className={iconStyle} />
        case "Tournaments":
            return <TbTrophy className={iconStyle} />
        case "News":
            return <TbNews className={iconStyle} />
        case "Fixtures":
            return <TbBallTennis className={iconStyle} />
        case "Watchlist":
            return <TbBinoculars className={iconStyle} />

        case "Create Team":
        case "Create Tournament":
            return <TbPlus className={iconStyle} />

        case "Edit Team":
        case "Edit Tournaments":
            return <TbEdit className={iconStyle} />
        
        default:
            return;
    }
}

const Sidebar = () => {
    const [shouldOpen, setShouldOpen] = useState(true);
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
    <nav 
        className="fixed top-0 left-0 z-50 flex flex-col justify-between items-center"
    >
        <div 
            className={"w-[20rem] h-screen py-20 text-center bg-theme-w-alt flex flex-col justify-center transition-transform duration-300 shadow-xl " 
                        + (shouldOpen ? ' translate-x-[0] ' : ' translate-x-[-100%] ')}
        >
        {
            sideNavItems?.map(({label, url}, ind) => {
                return <SideItem key={ind} label={label} url={url} icon={getIcon(label)} />
            })
        }
        <button onClick={handleLogInOut}
            className="w-full space-x-4 text-md py-5 text-theme uppercase font-bold hover:bg-theme hover:text-theme-w"
            >
        {
            isLoggedIn ? <><TbLogout className={iconStyle} />Logout</> : <><TbLogin className={iconStyle} />Login</>
        }
        </button>
        </div>

        <button 
            onClick={() => setShouldOpen(!shouldOpen)}
            className={'absolute top-0 left-0 rounded-[50%] m-2 p-2 text-theme-w bg-theme'} 
        >
            <TbMenu className='w-5 h-5' />
        </button>

    </nav>
  )
}

const SideItem = ({label, url, style, icon} : ISideNavItem) => {
    return (
        <Link 
            to={url} 
            className={`w-full text-md py-5 text-theme uppercase font-bold hover:bg-theme hover:text-theme-w ${style}`}
        >
            {icon ? icon : <></>}
            {label}
        </Link>
    )
}

export default Sidebar

