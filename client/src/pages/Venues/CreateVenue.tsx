import { IVenueForm } from "../../utils/ITypes";
import { AxiosPost } from "../../utils/utils";
import Message from "../../components/Message";
import { useInfoHandler } from "../../customhook/info";
import FormWrapper from "../FormWrapper";
import VeneueFormCard from "./VenueForm";
import { useDNavigate } from "../../customhook/dnavigate";

const CreateVenue = () => {

  const { dnav } = useDNavigate();
  const { info, setInfo } = useInfoHandler();

  const createVenue = async (data: any) => {
    AxiosPost(`/venues/create`, data, setInfo);
    dnav("/venues", 1000);
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
