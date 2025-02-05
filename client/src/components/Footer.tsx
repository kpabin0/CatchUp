import { Link } from "react-router-dom"
import { _usefulLinks, _otherLinks, _socialHandles, _quickLinks } from "../data/_footerItems"
import { FaFacebook, FaYoutube, FaInstagram, FaQuestion, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";
import BasicDiv from "./BasicDiv";
import { INavItem } from "../utils/ITypes";

interface ISocialMediaItem  {
    media: string,
    url: string
};

interface IFotLinks {
    title: string,
    items: INavItem[]
};

const Footer = () => {
  return (
    <>
    <BasicDiv ostyle="w-full !justify-between min-h-[25rem] m-0 p-0 bg-theme text-left bg-theme">
        <BasicDiv ostyle="w-full px-[20%] text-sm font-bold text-theme-w !flex-row space-x-3 py-5">
            <div className="flex flex-row justify-center items-center space-x-2">
                <Logo ostyle="h-[2rem] w-[2rem] inline-block" />
                <span className="text-xl font-bold uppercase">Catchup</span>
            </div>
            <div className="flex flex-col lg:flex-row justify-evenly items-center space-y-2 lg:space-x-2">
                <span className="inline-block">Stay upto date</span>
                <Link to={"/subscribe"} className="bg-white text-theme inline-block p-2 px-3 rounded-xl hover:bg-theme-w-alt">Subscribe to Newsletter</Link>
            </div>
        </BasicDiv>
        <hr className="border border-theme-cont w-[40%] rounded-xl my-2"/>
        <div className="flex flex-row justify-around items-start w-full">
            <FotLinks title={"Useful Links"} items={_usefulLinks} />
            <FotLinks title={"Quick Links"} items={_quickLinks} />
            <FotLinks title={"Others"} items={_otherLinks} />
        </div>
        <hr className="border border-theme-cont w-[90%] rounded-xl my-2"/>
        <SocialLinks />
        <FooterInfo />
    </BasicDiv>
    </>
  )
}

const FotLinks = ({title, items} : IFotLinks) => {
    return (
        <BasicDiv ostyle="text-theme-w ">
            <span className="w-full font-extrabold text-xl mb-2">{title}</span>
            {
                items.map(({label, url}: INavItem) => {
                    return <Link key={label} to={url} className="w-full my-[0.1rem] opacity-[70%] hover:opacity-100">
                                {label}
                            </Link>
                })
            }
        </BasicDiv>
    )
}

const SocialLinks = () => {
    return (
    <BasicDiv ostyle="max-w-full my-2 flex !flex-row justify-evenly items-center space-x-5 text-theme-w">
        <span className="text-xl font-extrabold">Connect:</span>
            {
                _socialHandles.map(({media, url}) => {
                    return <SocialMediaItem key={media} media={media} url={url} />
                })
            }
        <span className="hover:underline"><a href="mailto:npldbms@gmail.com">npldbms@gmail.com</a></span>
    </BasicDiv>
    )
}

const SocialMediaItem = ({media, url} : ISocialMediaItem) => {

    const socialStyle = "h-7 w-7 text-theme-w cursor-pointer transition-all duration-300 ";

    return (
        <Link to={url}>
            {
                media === "Facebook"    ? <FaFacebook className={socialStyle + "hover:text-blue-500"} /> :
                media === "Instagram"   ? <FaInstagram className={socialStyle + "hover:text-red-500"} /> :
                media === "Twitter"     ? <FaXTwitter className={socialStyle + "hover:text-black"} /> :
                media === "Youtube"     ? <FaYoutube className={socialStyle + "hover:text-red-600"} /> :
                media === "Linkedin"    ? <FaLinkedin className={socialStyle + "hover:text-blue-700"} /> :
                <FaQuestion className={socialStyle + "hover:text-gray-600"} />
            }
        </Link>
    )
}

const FooterInfo = () => {
    return (
        <div className="text-center text-sm w-full my-2 ">
            <span className=" block">All copyright reserved | @{new Date().getFullYear()}</span>
            <p>Powered by <b className=""> React.js | Tailwindcss | framer-motion </b></p>
        </div>
    )
}

export default Footer