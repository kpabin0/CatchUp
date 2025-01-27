// import BasicDiv from "../components/BasicDiv";

// const Home = () => {

//   return (
//     <section className="min-w-screen min-h-screen flex flex-col justify-center items-center">
//       <BasicDiv>
//         <span className="uppercase text-6xl text-theme font-extrabold">Catchup</span>
//       </BasicDiv>
//     </section>
//   );
// }

// export default Home;

import FullBgCover from '../components/FullBgCover';
import { Link } from 'react-router-dom';
import BasicDiv from '../components/BasicDiv';
import ThemeLink from '../components/ThemeLink';
import { getArray } from '../data/utils';
import { MatchCard } from './Matches/Matches';

const tempArr = getArray(4);

const Home = () => {
  return (
    <section className="min-w-screen min-h-screen flex flex-col justify-center items-center">

      <FullBgCover />
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center text-theme-w">
        <h1 className="font-main-a text-5xl my-10 font-bold uppercase text-theme-w bg-theme p-6 rounded-xl">Catchup</h1>
        <p className="mt-4 text-lg block">Get the latest <Link to={"/news"} className="hover:underline" >news</Link>, <Link to={"/fixtures"} className="hover:underline">fixtures</Link> and updates about circket world</p>
      </div>
      <hr className="w-[50%] mx-auto border-2 border-theme" />

      <BasicDiv ostyle="w-[80%] min-h-[50vh]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme-w mb-8 uppercase">Top Players</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tempArr.map((player, index) => (
              <BasicDiv key={index} ostyle="bg-theme-w p-4 rounded-lg shadow-lg">
                <img src={"#"} alt={"player"} className="w-32 h-32 mx-auto bg-theme-g rounded-full object-cover mb-4" />
                <h3 className="text-xl font-semibold text-theme-g-alt uppercase">playername</h3>
                <h3 className="text-xl font-semibold text-theme-g-alt uppercase">Team</h3>
                <p className="text-theme-g">playerrole</p>
              </BasicDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle="w-full py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Upcoming Fixtures</h2>
          <div className="grid grid-cols-3 gap-10">
            {tempArr.map((fixture, index) => (
              <MatchCard key={index} />
            ))}
          </div>
        </div>
      </BasicDiv>
      <hr className="w-[50%] mx-auto border-2 border-theme" />

      <BasicDiv ostyle="w-full min-h-[50vh]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8 uppercase">Tournaments</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tempArr.map((tour, index) => (
              <BasicDiv key={index} ostyle="bg-theme-w p-6 rounded-lg shadow-lg border hover:border-theme">
                <h3 className="my-5 text-xl font-semibold text-theme-g-alt uppercase">Tournament Name</h3>
                <ThemeLink ostyle="self-end" url={`/tournaments/${index}`} label="Learn More" />
              </BasicDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

    </section>
  );
};

export default Home;

