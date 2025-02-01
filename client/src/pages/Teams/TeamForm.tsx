import React, { useState, useEffect } from 'react';
import { ITeamForm } from '../../data/ITypes';
import TextInputField from '../../components/ThemeInputField';

interface ITeamFormCard {
  d?: ITeamForm,
  onSubmit: (d: ITeamForm) => void
};


const TeamFormCard = ({d, onSubmit}: ITeamFormCard) => {

  const [data, setData] = useState<ITeamForm>({
    teamid: 0,
    name: '',
    description: ''
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
      teamid: data.teamid,
      name: '',
      description: ''
    })
  }

  return (
    <form onSubmit={formSubmit} onReset={formReset} className="">
      <TextInputField
        label="Team id"
        type="number"
        name="teamid"
        value={data.teamid?.toString()}
        placeholder="Team id (not required)"
        onInputChange={onInputChange}
        readOnly={true}
      />
      <TextInputField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        placeholder="Enter Team Name"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Description"
        type="text"
        name="description"
        value={data.description}
        placeholder="Enter team description"
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
export default TeamFormCard;
  
