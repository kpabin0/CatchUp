import { Link } from "react-router-dom"
import { _otherLinks, _socialHandles } from "../data/_footerItems"
import { FaFacebook, FaYoutube, FaInstagram, FaQuestion, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

interface ISocialMediaItem  {
    media: string,
    url: string
};

const Footer = () => {
  return (
    <>
    <footer className="min-h-[25rem] h-[25rem] bg-theme w-full flex flex-col justify-evenly items-center">
        <div className="text-sm font-bold text-theme-w">
            <span className="inline-block">Want to stay up to date</span>
            <Link to={"/subscribe"} className="bg-white text-theme inline-block p-2 px-4 rounded-xl mx-3 hover:bg-gray-200">Subscribe to Newsletter</Link>
        </div>
        <hr className="border border-theme-cont w-[80%] rounded-xl my-2"/>
        <div className="flex flex-row justify-around items-center w-full">
            <div className="flex flex-col justify-evenly items-center h-full text-theme-w">
                <span className="text-2xl font-bold uppercase">Catchup</span>
                <Logo />
            </div>
            <MoreLinks />
            <SocialLinks />
        </div>
        <hr className="border border-theme-cont w-[40%] rounded-xl my-2"/>
        <FooterInfo />
    </footer>
    </>
  )
}

const MoreLinks = () => {
    return (
        <div className="flex flex-col justify-evenly items-start text-theme-w ">
            <span className="font-bold underline mb-4">Other Links</span>
            {
                _otherLinks.map(({label, url}) => {
                    return <Link 
                                key={label} 
                                to={url} 
                                className="m-[0.2rem] hover:underline underline-offset-4"
                            >
                                {label}
                            </Link>
                })
            }
        </div>
    )
}

const SocialLinks = () => {
    return (
    <div className="flex flex-col justify-evenly items-start h-full text-theme-w min-w-[20%]">
        <span className="text-theme-w text-xl font-main-a font-bold underline">Connect</span>
        <div className="grid grid-cols-4 gap-10 w-full">
            {
                _socialHandles.map(({media, url}) => {
                    return <SocialMediaItem key={media} media={media} url={url} />
                })
            }
        </div>
        <span className="text-black">Email : <a href="mailto:npldbms@gmail.com">npldbms@gmail.com</a></span>
    </div>
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
        <div className="text-center bg-theme text-sm w-full ">
            <p>Powered by <b className=""> React.js | Tailwindcss | framer-motion </b></p>
            <span className=" block">All copyright reserved | @{new Date().getFullYear()}</span>
        </div>
    )
}

export default Footer