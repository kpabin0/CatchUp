// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { backendBaseURL } from "../../data/utils";
// import { ITournament } from "../../data/ITypes";
// import BorderDiv from "../../components/BorderDiv";
// import BasicDiv from "../../components/BasicDiv";
// import { checkAdminStatus } from "../../data/utils";
// import ThemeLink from "../../components/ThemeLink";
// import Loading from "../../components/Loading";

import BasicDiv from "../../components/BasicDiv";
import ThemeDiv from "../../components/ThemeDiv";
import { getArray } from "../../data/utils";
import { MatchCard } from "../Matches/Matches";

// const TournamentDetails = () => {
//   const { tid } = useParams<{ tid: string }>();
//   console.log("Tournament ID from URL:", tid);  
//   const [isAdmin, setIsAdmin] = useState(false); 

//   const [tournament, setTournament] = useState<ITournament | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTournament = async () => {
//       if (!tid) {
//         setError("Tournament ID is missing.");
//         return;
//       }

//       try {
//         console.log("Fetching tournament with ID:", tid);  
//         const response = await axios.get(
//           backendBaseURL + `/tournaments/${tid}`
//         );
//         console.log("API Response:", response.data); 

//         if (response.data) {
//           setTournament(response.data);
//         } else {
//           setError("Tournament not found.");
//         }
//       } catch (error: any) {
//         setError("Error fetching tournament data.");
//         console.error("Error fetching tournament:", error);
//       }
//     };

//     if (tid) {
//       fetchTournament();
//     }
//   }, [tid]);


//   useEffect(() => {
//     setIsAdmin(checkAdminStatus());
//   }, []);

//   return (
//     <section className="w-full h-screen flex justify-center items-center">
//       <BorderDiv ostyle="w-[30rem] p-4 py-10 shadow-xl">
          
//         <h2 className="text-2xl font-bold text-theme text-center py-5 uppercase">
//           Tournament Details
//         </h2>

//         {error && <div className="text-theme-cont">{error}</div>}

//         {tournament ? (
//           <>
//           <BasicDiv ostyle="w-full">
//             <div className="space-y-4">
//               <div>
//                 <strong>Tournament ID:</strong> {tournament.tournamentid}
//               </div>
//               <div>
//                 <strong>Name:</strong> {tournament.name}
//               </div>
//               <div>
//                 <strong>Start Date:</strong> {tournament.start_date}
//               </div>
//               <div>
//                 <strong>End Date:</strong> {tournament.end_date}
//               </div>
//             </div>
//           </BasicDiv>
//           {isAdmin && <ThemeLink ostyle="m-4" label="Edit" url={`/tournaments/edit/${tournament?.tournamentid}`} />}
//           </>
//         ) : (
//           <Loading />
//         )}
//       </BorderDiv>
//     </section>
//   );
// };

// export default TournamentDetails;

// Sample tournament data

const tempArr = getArray(4);

const TournamentDetails = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <BasicDiv ostyle="min-h-[40vh] bg-theme text-theme-w">
        <h1 className="text-4xl font-bold">Tournament Name</h1>
        <p className="mt-4 text-lg">Tournament description will be here</p>
      </BasicDiv>

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Participating Teams</h2>
          <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tempArr.map((team, index) => (
              <BasicDiv key={index} ostyle="bg-theme-w p-6 rounded-lg shadow-lg">
                <img src={"#"} alt={"team"} className="w-32 h-32 mx-auto mb-4 bg-theme-g" />
                <h3 className="text-xl font-semibold text-theme-g uppercase">teamname</h3>
              </BasicDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Results</h2>
          <div className="grid grid-cols-3 gap-10">
            {tempArr.map((result, index) => (
              <ThemeDiv key={index} ostyle="bg-theme-w p-6">
                <h3 className="text-xl font-semibold text-theme-g uppercase">result match (t1 vs t2)</h3>
                <p className="text-theme-cont">t1 won/loss t2 by ...</p>
              </ThemeDiv>
            ))}
          </div>
        </div>
      </BasicDiv>

      <BasicDiv ostyle=" py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Match Schedule</h2>
          <div className="grid grid-cols-3 gap-8">
            {tempArr.map((match, index) => (
              <MatchCard />
            ))}
          </div>
        </div>
      </BasicDiv>

    </section>
  );
};

export default TournamentDetails;

