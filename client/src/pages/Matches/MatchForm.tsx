import GenericForm, { IInputFieldProps } from "../../components/GenericForm";
import { IMatchForm } from "../../data/ITypes";

interface IMatchFormCard {
  d?: IMatchForm,
  onSubmit: (d: IMatchForm) => void
};

const MatchFormCard = ({d, onSubmit}: IMatchFormCard) => {
  
  const fields: IInputFieldProps[] = [
    {label: "Match id", name: "matchid", type: "number", value: d?.matchid?.toString() || '0', readOnly: true},
    {label: "Team 1", name: "team_1", type: "text", value: d?.team_1, required: true},
    {label: "Team 2", name: "team_2", type: "text", value: d?.team_2, required: true},
    {label: "Date", name: "date", type: "date", value: d?.date, required: true},
    {label: "Venue", name: "venue", type: "text", value: d?.venue, required: true}
  ]

  return (
    <GenericForm 
      fields={fields}
      onSubmit={onSubmit}
    />
  );
};

export default MatchFormCard;
