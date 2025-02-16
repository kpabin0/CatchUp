import FormWrapper from '../FormWrapper'
import { useInfoHandler } from '../../customhook/info';
import { ITeamForm } from '../../utils/ITypes';
import { AxiosPost } from '../../utils/utils';
import Message from '../../components/Message';
import TeamFormCard from './TeamForm';
import { useDNavigate } from '../../customhook/dnavigate';

const CreateTeam = () => {
    const { info, setInfo } = useInfoHandler();
    const { dnav } = useDNavigate()
  
    const createTeam = async (data: any) => {
      AxiosPost(`/teams/create`, data, setInfo);
      dnav(`/teams`, 1000);
    };
  
    const onSubmit = (data: ITeamForm) => {
        createTeam(data)
    }

  return (
    <FormWrapper title="Add Team">
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
        <TeamFormCard onSubmit={onSubmit} />  
    </FormWrapper>
  )
}

export default CreateTeam