import { Link } from "react-router-dom"

const HomeButton = () => {
  return (
    <Link
        to={"/home"}
        className={"bg-theme p-2 px-4 text-white rounded-md font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"}
    >
    Home
    </Link>
  )
}

export default HomeButton