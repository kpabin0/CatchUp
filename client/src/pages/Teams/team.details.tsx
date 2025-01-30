import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendBaseURL } from "../../data/utils";
import { ITeam } from "../../data/ITypes";
import BorderDiv from "../../components/BorderDiv";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../data/utils";
import ThemeLink from "../../components/ThemeLink";
import Loading from "../../components/Loading";

const TeamDetails = () => {
  const { teamid } = useParams<{ teamid: string }>();
  console.log("Team ID from URL:", teamid);

  const [team, setTeam] = useState<ITeam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const[message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const fetchVenue = async () => {
      if (!teamid) {
        setError("Team ID is missing.");
        return;
      }

      try {
        console.log("Fetching venue with ID:", teamid);
     
        const response = await axios.get(backendBaseURL+`/team/${teamid}`);
        console.log("API Response:", response.data);
        setMessage("Tournament created successfully!");
        if (response.data) {
          setTeam(response.data);
        } else {
          setError("Venue not found.");
        }
      } catch (error: any) {
        setError("Error fetching venue data.");
        console.error("Error fetching venue:", error.response);
      }
    };

    if (teamid) {
      fetchVenue();
    }
  }, [teamid]);

 
  useEffect(() => {
    setIsAdmin(checkAdminStatus());
  }, []);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[30rem] p-4 py-10 shadow-xl">
        <h2 className="text-2xl font-bold text-theme text-center py-5 uppercase">
          Team Details
        </h2>

        {error && <div className="text-theme-cont">{error}</div>}

        {team ? (
          <>
            <BasicDiv ostyle="w-full">
              <div className="space-y-4">
                <div>
                  <strong>Team ID:</strong> {team.teamid}
                </div>
                <div>
                  <strong>Name:</strong> {team.name}
                </div>
                <div>
                  <strong>Description:</strong> {team.description}
                </div>
                
              </div>
            </BasicDiv>
            {isAdmin && (
              <ThemeLink
                ostyle="m-4"
                label="Edit"
                url={`/venues/edit/${team?.teamid}`}
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </BorderDiv>
    </section>
  );
};

export default TeamDetails;
