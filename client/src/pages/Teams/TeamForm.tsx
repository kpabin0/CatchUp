import { ITeamForm } from '../../data/ITypes';
import GenericForm, { IInputFieldProps } from '../../components/GenericForm';

interface ITeamFormCard {
  d?: ITeamForm,
  onSubmit: (d: ITeamForm) => void
};


const TeamFormCard = ({d, onSubmit}: ITeamFormCard) => {

  const fields: IInputFieldProps[] = [
    {label: "Team id", name: "teamid", type: "number", value: d?.teamid?.toString() || '0', readOnly: true},
    {label: "Name", name: "name", type: "text", value: d?.name, required: true},
    {label: "Description", name: "description", type: "text", value: d?.description, required: true},
  ]

  return (
    <GenericForm 
      fields={fields}
      onSubmit={onSubmit}
    />
  );
};
export default TeamFormCard;
  
