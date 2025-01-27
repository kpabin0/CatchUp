// import { useParams } from 'react-router-dom'
import BasicDiv from '../components/BasicDiv';

const PlayerInfo = ({}) => {
  return (
    <section className="flex flex-col justify-evenly items-center min-h-screen min-w-full">
    <BasicDiv ostyle="w-[80%] grid grid-cols-2 gap-10 border shadow p-6 text-theme-g text-lg">
      <div className="flex flex-col items-center mb-6">
        <img 
          src="/assets/player.png"
          alt={"player"} 
          className="w-[20rem] h-[20rem] object-cover mb-4 bg-theme"
        />
        <h2 className="text-2xl font-bold text-theme uppercase">Player Name</h2>
        <p><strong>Country: </strong>nepal</p>
        <p><strong>Role: </strong>role</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-theme uppercase">Batting Stats</h3>
          <p><strong>Runs: </strong>runs</p>
          <p><strong>Average: </strong>average</p>
          <p><strong>Strike Rate: </strong>strike rate</p>
        </div>
        <hr className="w-full border-2 border-theme"/>
        <div>
          <h3 className="text-xl font-semibold text-theme uppercase">Bowling Stats</h3>
          <p><strong>Wickets: </strong>wickets</p>
          <p><strong>Average: </strong>average</p>
          <p><strong>Economy Rate: </strong>economy rate</p>
        </div>
      </div>
    </BasicDiv>
    </section>
  );
};


// const Player = () => {

//     const { tid, pid } = useParams();

//     console.log(tid, pid)

//   return (
//     <section className="min-h-screen min-w-full flex flex-row justify-evenly items-center relative">
//         <ThemeDiv className="w-[30rem] h-[30rem] bg-theme rounded-md">
//           <img src={"/assets/player.png"} alt={"img"} />
//         </ThemeDiv>
//         <BasicDiv ostyle="space-y-2 uppercase text-left">
//           <h1 className="font-bold text-3xl text-theme">Player Name</h1>
//           <span className="block">Team: {tid}</span>
//           <span className="block">Player Number: {pid}</span>
//           <div className="space-x-2 underline font-bold">
//             <span className='text-theme'>Match1</span>
//             <span>Match2</span>
//           </div>
//           <KeyValSpan1 k="balls played" v="10" />
//           <KeyValSpan1 k="balls bowled" v="10" />
//           <KeyValSpan1 k="runs" v="10" />
//           <KeyValSpan1 k="runs concieved" v="10" />
//           <KeyValSpan1 k="wickets" v="10" />
//           <KeyValSpan1 k="sixes" v="10" />
//           <KeyValSpan1 k="fours" v="10" />
//           <KeyValSpan1 k="playing status" v="yes" />
//         </BasicDiv>
//     </section>
//   )
// }

// export default Player
export default PlayerInfo;