import { Link } from "react-router-dom"

interface ILogo {
    ostyle? : string,
    linkEnable? : boolean
};

const Logo = ({ostyle, linkEnable} : ILogo) => {
  return (
    <Link to={linkEnable ? "/" : ""}>
        <img className={"  " + (ostyle ? ostyle : " h-[4rem] w-[4rem] ")} src="favicon.ico" alt="icon" />
    </Link>
  )
}

export default Logo