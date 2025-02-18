import FormWrapper from '../FormWrapper';
import MatchFormCard from './MatchForm';
import { IMatchForm } from '../../utils/ITypes';
import { AxiosPost } from '../../utils/utils';
import { useInfoHandler } from '../../customhook/info';
import Message from '../../components/Message';
import { useDNavigate } from '../../customhook/dnavigate';

const CreateMatch = () => {

    const { info, setInfo } = useInfoHandler();
    const { dnav } = useDNavigate();
  
    const createMatch = async (data: any) => {
      AxiosPost(`/matches/create`, data, setInfo);
      dnav(`/matches`, 1000);
    };
  
    const onSubmit = (data: IMatchForm) => {
        createMatch(data)
    }

  return (
    <FormWrapper title="Add Match">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <MatchFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreateMatch