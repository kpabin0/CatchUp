import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { IPlayer } from "../../data/ITypes";
import { backendBaseURL, checkAdminStatus } from "../../data/utils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const schema = Yup.object().shape({
    playerid: Yup.number()
        .required("Player id is required"),
    teamid: Yup.number()
        .required("Team id is required"),
    role: Yup.string()
        .required("Player role required"),
    name: Yup.string()
        .required("Player name required"),
    img: Yup.string()
        .optional(),
    dob: Yup.string()
        .optional(),
    phone: Yup.string()
        .optional(),
    address: Yup.string()
        .optional(),
});

const CreatePlayerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPlayer>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  
  useEffect(() => {
    setIsAdmin(checkAdminStatus())
  }, []);

  const onSubmit: SubmitHandler<IPlayer> = async (data: IPlayer) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(backendBaseURL + `/players`, data);
      console.log("player created successfully:", response.data);
      setSuccessMessage("player created successfully!");
      setErrorMessage(null);
      reset();
      setTimeout(() => {navigate("/players");}, 1000);
    } catch (error: any) {
      console.error("Error creating player:", error);
      setSuccessMessage(null);
      setErrorMessage("Error creating player.");
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("General error message:", error.message);
      }
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] p-4 bg-theme-w shadow-xl rounded-md border">
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          Create Player
        </h2>

        {successMessage && <Message message={successMessage} type="success" onClose={() => setSuccessMessage("")} />}
        {errorMessage && <Message message={errorMessage} type="error" onClose={() => setErrorMessage("")} />}

        {isAdmin ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full my-8 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-theme">Playerid</label>
              <input
                type="number"
                {...register("playerid")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter playerid"
              />
              {errors.playerid && <span className="text-theme-cont">{errors.playerid.message}</span>}
            </div>
            <div>
              <label className="block text-theme">Teamid</label>
              <input
                type="number"
                {...register("teamid")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter teamid"
              />
              {errors.teamid && <span className="text-theme-cont">{errors.teamid.message}</span>}
            </div>
            <div>
              <label className="block text-theme">Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter name"
              />
              {errors.name && <span className="text-theme-cont">{errors.name.message}</span>}
            </div>
            <div>
              <label className="block text-theme">Role</label>
              <input
                type="text"
                {...register("role")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter role"
              />
              {errors.role && <span className="text-theme-cont">{errors.role.message}</span>}
            </div>
            <div>
                <label className="block text-theme">img</label>
                <input
                    type="text"
                    {...register("img")}
                    className="w-full border rounded p-2 outline-theme"
                    placeholder="Enter img"
                />
                {errors.img && <span className="text-theme-cont">{errors.img.message}</span>}
            </div>
            <div>
                <label className="block text-theme">DOB</label>
                <input
                    type="date"
                    {...register("dob")}
                    className="w-full border rounded p-2 outline-theme"
                    placeholder="Enter dob"
                />
                {errors.dob && <span className="text-theme-cont">{errors.dob.message}</span>}
            </div>
            <div>
                <label className="block text-theme">Phone</label>
                <input
                    type="text"
                    {...register("phone")}
                    className="w-full border rounded p-2 outline-theme"
                    placeholder="Enter phone"
                />
                {errors.phone && <span className="text-theme-cont">{errors.phone.message}</span>}
            </div>
            <div>
                <label className="block text-theme">Address</label>
                <input
                    type="text"
                    {...register("address")}
                    className="w-full border rounded p-2 outline-theme"
                    placeholder="Enter address"
                />
                {errors.address && <span className="text-theme-cont">{errors.address.message}</span>}
            </div>

            <button
              type="submit"
              className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
            >
              Create Player
            </button>
          </form>
        ) : (
          <div className="text-center text-theme-cont">
            You do not have permission to create a player. Access is restricted to admins only.
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatePlayerForm;
