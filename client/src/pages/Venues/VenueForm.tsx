import { IVenueForm } from "../../data/ITypes";
import GenericForm, { IInputFieldProps } from "../../components/GenericForm";

interface IVenueFormCard {
  d?: IVenueForm | null,
  onSubmit: (d: IVenueForm) => void
};


const VeneueFormCard = ({d, onSubmit}: IVenueFormCard) => {

  const inpFields: IInputFieldProps[] = [
    {label: "Venue id", name: "venueid", type: "number", value: d?.venueid?.toString() || '0', readOnly: true},
    {label: "Name", name: "name", type: "text", value: d?.name, required: true},
    {label: "Seats", name: "seats", type: "number", value: d?.seats.toString() || '0', required: true},
    {label: "Location", name: "location", type: "text", value: d?.location, required: true}
  ]

  return (
    <GenericForm 
      fields={inpFields}
      onSubmit={onSubmit}
    />
  );
};

export default VeneueFormCard;
