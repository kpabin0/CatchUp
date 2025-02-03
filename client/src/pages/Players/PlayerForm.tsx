import { IPlayerForm } from '../../utils/ITypes';
import GenericForm, { IInputFieldProps } from '../../components/GenericForm';

interface IPlayerFormCard {
  d?: IPlayerForm,
  onSubmit: (d: IPlayerForm) => void
};


const PlayerFormCard = ({d, onSubmit}: IPlayerFormCard) => {

  const fields: IInputFieldProps[] = [
    {label: "Player id", name:"playerid", type:"number", value: d?.playerid?.toString() || '0', readOnly: true},
    {label: "Team id", name:"teamid", type:"number", value: d?.teamid?.toString() || '0', readOnly: true},
    {label: "Role", name:"role", type:"text", value: d?.role, required: true},
    {label: "Name", name:"name", type:"text", value: d?.name, required: true},
    {label: "Img URL", name:"img", type:"text", value: d?.img, required: true},
    {label: "DOB", name:"dob", type:"date", value: d?.dob, required: true},
    {label: "Phone", name:"phone", type:"text", value: d?.phone, required: true},
    {label: "Address", name:"address", type:"text", value: d?.address, required: true},
  ]

  return (
    <GenericForm 
      fields={fields}
      onSubmit={onSubmit}
      ostyle='grid grid-cols-2 gap-x-4'
    />
  );
};
export default PlayerFormCard;
  
