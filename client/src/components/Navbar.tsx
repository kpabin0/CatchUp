import { Link } from 'react-router-dom'
import { _navItems } from '../data/_navItems'
import { FaUser } from 'react-icons/fa'
import Logo from './Logo'

export interface INavItem {
    label: string,
    url: string,
    icon?: any,
};

const Navbar = () => {
  return (
    <nav 
        className="sticky w-full top-0 left-0 p-2 px-6 mb-5 z-50 flex flex-row justify-between items-center bg-white shadow-sm"
    >
        <Logo ostyle="h-[2rem] w-[2rem]" linkEnable={true} />
        <NavItems />
        <div className="flex flex-row justify-evenly items-center">
            <Link to={"/login"} className=" bg-theme p-2 text-white rounded-[50%]">
                <FaUser className="w-4 h-4" />
            </Link>
        </div>
    </nav>
  )
}

const NavItems = () => {
    return (
    <div className="w-[60%] flex flex-row justify-evenly items-center">
        {
            _navItems.map(({label, url}) => {
                return <NavItem 
                            key={label} 
                            label={label} 
                            url={url} 
                        />
            })
        }
    </div>
    )
}

const NavItem = ({label, url} : INavItem) => {
    return (
        <Link 
            to={url} 
            className="text-md m-2 text-theme uppercase font-bold font-main-a hover:scale-105"
        >
            {label}
        </Link>
    )
}

export default Navbar