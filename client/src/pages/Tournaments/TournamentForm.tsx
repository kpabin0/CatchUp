import React, { useEffect, useState } from "react";
import { ITournamentForm } from "../../data/ITypes";
import TextInputField from "../../components/ThemeInputField";

interface ITournamentFormCard {
  d?: ITournamentForm | null,
  onSubmit: (d: ITournamentForm) => void
};


const TournamentFormCard = ({d, onSubmit}: ITournamentFormCard) => {

  const [data, setData] = useState<ITournamentForm>({
    tournamentid: 100,
    name: "",
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if(d) {
      setData(d);
    }

  }, []);

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
      tournamentid: data.tournamentid,
      name: "",
      start_date: "",
      end_date: ""
    })
  }

  return (
    <form onSubmit={formSubmit} onReset={formReset} className="">
      <TextInputField
        label="Tournament id"
        type="number"
        name="tournamentid"
        value={data.tournamentid?.toString()}
        placeholder="Tournament id (not required)"
        onInputChange={onInputChange}
        readOnly={true}
      />
      <TextInputField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        placeholder="Enter Tournament Name"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Start Date"
        type="date"
        name="start_date"
        value={data.start_date}
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="End Date"
        type="date"
        name="end_date"
        value={data.end_date}
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

export default TournamentFormCard;
