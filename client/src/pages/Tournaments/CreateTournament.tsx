import { ITournamentForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import TournamentFormCard from "./TournamentForm";
import axios from "axios";

const CreateTournament = () => {
  const navigate = useNavigate();

  const { info, setInfo } = useInfoHandler();

  const createTournament = async (data: any) => {
    try {
        const response = await axios.post(backendBaseURL + `/tournaments/create`, data);
        console.log("Tournament created successfully:", response.data);
        setInfo(["Tournament created successfully!", "success"]);
        setTimeout(() => navigate("/tournaments"), 1000);
    } catch (error: any) {
        console.error("Error creating tournament:", error);
        setInfo(["Error creating tournament", "error"])
    }
  };

  const onSubmit = (data: ITournamentForm) => {
    if(Date.parse(data.start_date) < Date.parse(data.end_date)) {
        createTournament(data)
    }
    else {
        setInfo(["Start date must be less than end date", "error"])
    }
  }

  return (
    <FormWrapper title="Add Tournament">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <TournamentFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  );
};

export default CreateTournament;
