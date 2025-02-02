import { ITournamentForm } from "../../data/ITypes";
import GenericForm, { IInputFieldProps } from "../../components/GenericForm";

interface ITournamentFormCard {
  d?: ITournamentForm | null,
  onSubmit: (d: ITournamentForm) => void
};

const TournamentFormCard = ({d, onSubmit}: ITournamentFormCard) => {

  const inpFields: IInputFieldProps[] = [
    {label: "Tournament id", name: "tournamentid", type: "number", value: d?.tournamentid?.toString() || '0', readOnly: true},
    {label: "Name", name:"name", type: "text", value: d?.name, required: true},
    {label: "Start Date", name: "start_date", type: "date", value: d?.start_date, required: true},
    {label: "End Date", name: "end_date", type: "date", value: d?.end_date, required: true}
  ];

  return (
    <GenericForm 
      fields={inpFields}
      onSubmit={onSubmit}
    />
  );
};

export default TournamentFormCard;
