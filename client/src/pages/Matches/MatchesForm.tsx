import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { IMatchForm } from "../../data/ITypes";
import { backendBaseURL, checkAdminStatus } from "../../data/utils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const schema = Yup.object().shape({
    team_1: Yup.string()
        .max(100, "Name must be at most 100 characters")
        .required("Team Name is required"),
    team_2: Yup.string()
        .max(100, "Name must be at most 100 characters")
        .required("Team Name is required"),
    isLive: Yup.bool()
        .notRequired(),
    date: Yup.date()
        .required("date is required")
        .typeError("Invalid date format"),
});

const CreateMatchForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMatchForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  
  useEffect(() => {
    setIsAdmin(checkAdminStatus());
  }, []);

  const onSubmit: SubmitHandler<IMatchForm> = async (data: IMatchForm) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(backendBaseURL + `/matches`, data);
      console.log("Matche created successfully:", response.data);
      setSuccessMessage("Matche created successfully!");
      setErrorMessage(null);
      reset();
      setTimeout(() => {navigate("/matches");}, 1000);
    } catch (error: any) {
      console.error("Error creating match:", error);
      setSuccessMessage(null);
      setErrorMessage("Error creating match.");
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
          Create Match
        </h2>

        {successMessage && <Message message={successMessage} type="success" onClose={() => setSuccessMessage("")} />}
        {errorMessage && <Message message={errorMessage} type="error" onClose={() => setErrorMessage("")} />}

        {isAdmin ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full mt-8">
            <div>
              <label className="block text-theme">Team 1 Name:</label>
              <input
                type="text"
                {...register("team_1")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter Team 1 Name"
              />
              {errors.team_1 && <span className="text-theme-cont">{errors.team_1.message}</span>}
            </div>
            <div>
              <label className="block text-theme">Team 2 Name:</label>
              <input
                type="text"
                {...register("team_2")}
                className="w-full border rounded p-2 outline-theme"
                placeholder="Enter Team 2 Name"
              />
              {errors.team_2 && <span className="text-theme-cont">{errors.team_2.message}</span>}
            </div>

            <div>
              <label className="inline-block text-theme">IsLive</label>
              <input
                type="checkbox"
                {...register("isLive")}
                className="m-2 accent-theme"
              />
              {errors.isLive && (
                <span className="text-theme-cont">{errors.isLive.message}</span>
              )}
            </div>

            <div>
              <label className="block text-theme">Date:</label>
              <input
                type="date"
                {...register("date")}
                className="w-full border rounded p-2 outline-theme"
              />
              {errors.date && (
                <span className="text-theme-cont">{errors.date.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
            >
              Create Match
            </button>
          </form>
        ) : (
          <div className="text-center text-theme-cont">
            You do not have permission to create a match. Access is restricted to admins only.
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateMatchForm;
