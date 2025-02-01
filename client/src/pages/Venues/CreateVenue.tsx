import { IVenueForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import VeneueFormCard from "./VenueForm";
import axios from "axios";

const CreateVenue = () => {
  const navigate = useNavigate();

  const { info, setInfo } = useInfoHandler();

  const createVenue = async (data: any) => {
    try {
        const response = await axios.post(backendBaseURL + `/venues/create`, data);
        console.log("Venue created successfully:", response.data);
        setInfo(["Venue created successfully!", "success"]);
        setTimeout(() => navigate("/venues"), 1000);
    } catch (error: any) {
        console.error("Error creating Venue:", error);
        setInfo(["Error creating Venue", "error"])
    }
  };

  const onSubmit = (data: IVenueForm) => {
    createVenue(data);
  }

  return (
    <FormWrapper title="Add Venue">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <VeneueFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  );
};

export default CreateVenue;
