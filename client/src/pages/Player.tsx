import { useParams } from 'react-router-dom'

const Player = () => {

    const { tid, pid } = useParams();

    console.log(tid, pid)

  return (
    <section className="min-h-screen min-w-full flex flex-row justify-evenly items-center relative">
        <div className="w-[30rem] h-[30rem] bg-theme">
          <img src={"#"} alt={"img"} />
        </div>
        <div>
          <span className="font-bold text-3xl ">Player Name</span>
          <span className="block">Team: {tid}</span>
          <span className="block">Player Number: {pid}</span>
        </div>
    </section>
  )
}

export default Player