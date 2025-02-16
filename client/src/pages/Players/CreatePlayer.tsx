import FormWrapper from '../FormWrapper'
import { useInfoHandler } from '../../customhook/info';
import { IPlayerForm } from '../../utils/ITypes';
import { AxiosPost } from '../../utils/utils';
import Message from '../../components/Message';
import PlayerFormCard from './PlayerForm';
import { useDNavigate } from '../../customhook/dnavigate';

const CreatePlayer = () => {
    const { info, setInfo } = useInfoHandler();
    const { dnav } = useDNavigate()
  
    const createPlayer = async (data: any) => {
      AxiosPost(`/player/create`, data, setInfo);
      dnav(`/player`, 1000);
    };
  
    const onSubmit = (data: IPlayerForm) => {
        createPlayer(data)
    }

  return (
    <FormWrapper title="Add Player" ostyle="w-[35rem]">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <PlayerFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreatePlayer