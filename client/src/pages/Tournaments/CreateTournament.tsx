import { ITournamentForm } from "../../utils/ITypes";
import { AxiosPost } from "../../utils/utils";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import TournamentFormCard from "./TournamentForm";
import { useDNavigate } from "../../customhook/dnavigate";

const CreateTournament = () => {
  
  const { info, setInfo } = useInfoHandler();
  const { dnav } = useDNavigate();

  const createTournament = async (data: any) => {

    AxiosPost(`/tournaments/create`, data, setInfo);
    dnav("/tournaments", 1000);
  };

  const onSubmit = (data: ITournamentForm) => {
    // console.log(data.start_date, data.end_date);
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
