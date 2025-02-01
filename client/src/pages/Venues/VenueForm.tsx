import React, { useEffect, useState } from "react";
import { IVenueForm } from "../../data/ITypes";
import TextInputField from "../../components/ThemeInputField";

interface IVenueFormCard {
  d?: IVenueForm | null,
  onSubmit: (d: IVenueForm) => void
};


const VeneueFormCard = ({d, onSubmit}: IVenueFormCard) => {

  const [data, setData] = useState<IVenueForm>({
    venueid: 0,
    name: "",
    seats: 0,
    location: "",
  })

  useEffect(() => {
    if(d) {
      setData(d);
    }

  }, [d]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
  }  

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  }

  const formReset = (e: React.FormEvent) => {
    e.preventDefault();
    setData({
        venueid: 0,
        name: "",
        seats: 0,
        location: "",
    })
  }

  return (
    <form onSubmit={formSubmit} onReset={formReset} className="">
      <TextInputField
        label="Venue id"
        type="number"
        name="venueid"
        value={data.venueid?.toString()}
        placeholder="Venue id (not required)"
        onInputChange={onInputChange}
        readOnly={true}
      />
      <TextInputField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        placeholder="Enter Venue Name"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Seat Capacity"
        type="number"
        name="seats"
        value={data.seats.toString()}
        placeholder="Enter seats"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Location"
        type="text"
        name="location"
        value={data.location}
        placeholder="Enter location"
        onInputChange={onInputChange}
        required={true}
      />


      <button
        type="submit"
        className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
      <button
        type="reset"
        className="mx-2 bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
      >
        Clear
      </button>
    </form>
  );
};

export default VeneueFormCard;
