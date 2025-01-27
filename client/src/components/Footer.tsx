import { Link } from "react-router-dom"
import { _otherLinks, _socialHandles } from "../data/_footerItems"
import { FaFacebook, FaYoutube, FaInstagram, FaQuestion, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";
import BasicDiv from "./BasicDiv";

interface ISocialMediaItem  {
    media: string,
    url: string
};

const Footer = () => {
  return (
    <>
    <BasicDiv ostyle="w-full h-[25rem] m-0 bg-theme hover:bg-theme flex flex-col justify-evenly items-center">
        <div className="text-sm font-bold text-theme-w">
            <span className="inline-block">Want to stay up to date</span>
            <Link to={"/subscribe"} className="bg-white text-theme inline-block p-2 px-4 rounded-xl mx-3 hover:bg-gray-200">Subscribe to Newsletter</Link>
        </div>
        <hr className="border border-theme-cont w-[80%] rounded-xl my-2"/>
        <div className="flex flex-row justify-around items-center w-full">
            <BasicDiv ostyle="h-full text-theme-w">
                <span className="text-2xl font-bold uppercase">Catchup</span>
                <Logo />
            </BasicDiv>
            <MoreLinks />
            <SocialLinks />
        </div>
        <hr className="border border-theme-cont w-[40%] rounded-xl my-2"/>
        <FooterInfo />
    </BasicDiv>
    </>
  )
}

const MoreLinks = () => {
    return (
        <BasicDiv ostyle="text-theme-w">
            <span className="font-bold underline mb-4">Other Links</span>
            {
                _otherLinks.map(({label, url}) => {
                    return <Link key={label} to={url} className="m-[0.2rem] hover:underline underline-offset-4">
                                {label}
                            </Link>
                })
            }
        </BasicDiv>
    )
}

const SocialLinks = () => {
    return (
    <BasicDiv ostyle="h-full">
        <span className="text-theme-w text-xl font-main-a font-bold underline">Connect</span>
        <div className="grid grid-cols-4 gap-10 w-full">
            {
                _socialHandles.map(({media, url}) => {
                    return <SocialMediaItem key={media} media={media} url={url} />
                })
            }
        </div>
        <span className="text-black">Email : <a href="mailto:npldbms@gmail.com">npldbms@gmail.com</a></span>
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
        <div className="text-center bg-theme text-sm w-full ">
            <p>Powered by <b className=""> React.js | Tailwindcss | framer-motion </b></p>
            <span className=" block">All copyright reserved | @{new Date().getFullYear()}</span>
        </div>
    )
}

export default Footer