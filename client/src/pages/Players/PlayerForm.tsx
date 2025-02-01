import React, { useState, useEffect } from 'react';
import { IPlayerForm } from '../../data/ITypes';
import TextInputField from '../../components/ThemeInputField';

interface IPlayerFormCard {
  d?: IPlayerForm,
  onSubmit: (d: IPlayerForm) => void
};


const PlayerFormCard = ({d, onSubmit}: IPlayerFormCard) => {

  const [data, setData] = useState<IPlayerForm>({
    playerid: 0,
    teamid: 0,
    role: "",
    name: "",
    img: "",
    dob: "",
    phone: "",
    address: ""
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
      playerid: data.playerid,
      teamid: data.teamid,
      role: "",
      name: "",
      img: "",
      dob: "",
      phone: "",
      address: ""
    })
  }

  return (
    <form onSubmit={formSubmit} onReset={formReset} className="grid grid-cols-2 gap-x-4">
      <TextInputField
        label="Player id"
        type="number"
        name="playerid"
        value={data.playerid?.toString()}
        placeholder="Player id (not required)"
        onInputChange={onInputChange}
        readOnly={true}
      />
      <TextInputField
        label="Team id"
        type="number"
        name="teamid"
        value={data.teamid.toString()}
        placeholder="Team id"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        placeholder="Enter player name"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Role"
        type="text"
        name="role"
        value={data.role}
        placeholder="Enter player role"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Img url"
        type="text"
        name="img"
        value={data.img}
        placeholder="Enter player img url"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="DOB"
        type="date"
        name="dob"
        value={data.dob}
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Phone"
        type="text"
        name="phone"
        value={data.phone}
        placeholder="Enter phone"
        onInputChange={onInputChange}
        required={true}
      />
      <TextInputField
        label="Address"
        type="text"
        name="address"
        value={data.address}
        placeholder="Enter address"
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
export default PlayerFormCard;
  
