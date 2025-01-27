import { useParams } from 'react-router-dom'
import ThemeDiv from '../components/ThemeDiv';
import BasicDiv from '../components/BasicDiv';
import { KeyValSpan1 } from '../components/KeyValueSpan';

const Player = () => {

    const { tid, pid } = useParams();

    console.log(tid, pid)

  return (
    <section className="min-h-screen min-w-full flex flex-row justify-evenly items-center relative">
        <ThemeDiv className="w-[30rem] h-[30rem] bg-theme rounded-md">
          <img src={"/assets/player.png"} alt={"img"} />
        </ThemeDiv>
        <BasicDiv ostyle="space-y-2 uppercase text-left">
          <h1 className="font-bold text-3xl text-theme">Player Name</h1>
          <span className="block">Team: {tid}</span>
          <span className="block">Player Number: {pid}</span>
          <div className="space-x-2 underline font-bold">
            <span className='text-theme'>Match1</span>
            <span>Match2</span>
          </div>
          <KeyValSpan1 k="balls played" v="10" />
          <KeyValSpan1 k="balls bowled" v="10" />
          <KeyValSpan1 k="runs" v="10" />
          <KeyValSpan1 k="runs concieved" v="10" />
          <KeyValSpan1 k="wickets" v="10" />
          <KeyValSpan1 k="sixes" v="10" />
          <KeyValSpan1 k="fours" v="10" />
          <KeyValSpan1 k="playing status" v="yes" />
        </BasicDiv>
    </section>
  )
}

export default Player