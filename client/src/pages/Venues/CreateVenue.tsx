import { IVenueForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import VeneueFormCard from "./VenueForm";
import axios from "axios";
import { useDNavigate } from "../../customhook/dnavigate";

const CreateVenue = () => {

  const { dnav } = useDNavigate();
  const { info, setInfo } = useInfoHandler();

  const createVenue = async (data: any) => {
    try {
        const response = await axios.post(backendBaseURL + `/venues/create`, data);
        console.log("Venue created successfully:", response.data);
        setInfo(["Venue created successfully!", "success"]);
        dnav("/venues", 1000);
        // setTimeout(() => navigate("/venues"), 1000);
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
