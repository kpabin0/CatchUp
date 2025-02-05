import HomeButton from "../components/HomeButton";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-evenly items-center h-[100vh] w-full text-center">
      <div>
        <span className="text-[20rem] text-theme font-extrabold block">404</span>
        <span className="text-2xl font-light font-f6">Page not found</span>
      </div>
      <HomeButton />
    </div>
  )
}

export default NotFound