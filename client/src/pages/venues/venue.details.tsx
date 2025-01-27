import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendBaseURL } from "../../data/utils";
import { IVenue } from "../../data/ITypes";
import BorderDiv from "../../components/BorderDiv";
import BasicDiv from "../../components/BasicDiv";
import { checkAdminStatus } from "../../data/utils";
import ThemeLink from "../../components/ThemeLink";
import Loading from "../../components/Loading";

const VenueDetails = () => {
  const { venueid } = useParams<{ venueid: string }>();
  console.log("Venue ID from URL:", venueid);

  const [venue, setVenue] = useState<IVenue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const[message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const fetchVenue = async () => {
      if (!venueid) {
        setError("Venue ID is missing.");
        return;
      }

      try {
        console.log("Fetching venue with ID:", venueid);
     
        const response = await axios.get(backendBaseURL+`/venues/${venueid}`);
        console.log("API Response:", response.data);
        setMessage("Tournament created successfully!");
        if (response.data) {
          setVenue(response.data);
        } else {
          setError("Venue not found.");
        }
      } catch (error: any) {
        setError("Error fetching venue data.");
        console.error("Error fetching venue:", error.response);
      }
    };

    if (venueid) {
      fetchVenue();
    }
  }, [venueid]);

 
  useEffect(() => {
    setIsAdmin(checkAdminStatus());
  }, []);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <BorderDiv ostyle="w-[30rem] p-4 py-10 shadow-xl">
        <h2 className="text-2xl font-bold text-theme text-center py-5 uppercase">
          Venue Details
        </h2>

        {error && <div className="text-theme-cont">{error}</div>}

        {venue ? (
          <>
            <BasicDiv ostyle="w-full">
              <div className="space-y-4">
                <div>
                  <strong>Venue ID:</strong> {venue.venueid}
                </div>
                <div>
                  <strong>Name:</strong> {venue.name}
                </div>
                <div>
                  <strong>Number of Seats:</strong> {venue.seats}
                </div>
                <div>
                  <strong>Location:</strong> {venue.location}
                </div>
              </div>
            </BasicDiv>
            {isAdmin && (
              <ThemeLink
                ostyle="m-4"
                label="Edit"
                url={`/venues/edit/${venue?.venueid}`}
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

export default VenueDetails;
