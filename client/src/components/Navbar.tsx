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
        className="fixed w-full top-0 left-0 p-2 px-6 z-50 font-f6 flex flex-row justify-between items-center bg-white shadow-sm border-b "
    >
        <Link to="/" className="flex flex-row justify-evenly items-center space-x-2">
            <Logo ostyle="h-[1.5rem] w-[1.5rem]" />
            <span className="text-theme text-md uppercase font-extrabold">Catchup</span>
        </Link>
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
    <div className="min-w-[40%] flex flex-row justify-evenly items-center">
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
            className="text-md mx-2 p-2 text-theme capitalize font-bold rounded-md hover:bg-theme-w-alt"
        >
            {label}
        </Link>
    )
}

export default Navbar