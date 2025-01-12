import { Link } from "react-router-dom"

interface ILogo {
    style? : string,
    linkEnable? : boolean
};

const Logo = ({style, linkEnable} : ILogo) => {
  return (
    <Link to={linkEnable ? "/" : ""}>
        <img className={"  " + (style ? style : " h-[4rem] w-[4rem] ")} src="favicon.ico" alt="icon" />
    </Link>
  )
}

export default Logo