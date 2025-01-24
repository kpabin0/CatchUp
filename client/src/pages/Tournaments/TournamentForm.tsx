
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { ITournamentForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  start_date: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  end_date: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(Yup.ref("start_date"), "End date must be after the start date"),
});


const CreateTournamentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITournamentForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ITournamentForm> = async (data: ITournamentForm) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(backendBaseURL + `/tournaments`, data);
      console.log("Tournament created successfully:", response.data);
      setSuccessMessage("Tournament created successfully!");
      setErrorMessage(null);
      reset();
      navigate("/tournaments");
    } catch (error: any) {
      console.error("Error creating tournament:", error);
      setSuccessMessage(null);
      setErrorMessage("Error creating tournament.");
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
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">Create Tournament</h2>

        {successMessage && (
          <div className="bg-theme-green text-theme-w p-4 rounded-md mb-4 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              className="text-theme-w font-bold ml-4"
              onClick={() => setSuccessMessage(null)}
            >
              X
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="bg-theme-cont text-theme-w p-4 rounded-md mb-4 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              className="text-theme-w font-bold ml-4"
              onClick={() => setErrorMessage(null)}
            >
              X
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full mt-8">
          <div>
            <label className="block text-theme">Name:</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded p-2 outline-theme"
              placeholder="Enter Tournament Name"
            />
            {errors.name && <span className="text-theme-cont">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-theme">Start Date:</label>
            <input
              type="date"
              {...register("start_date")}
              className="w-full border rounded p-2 outline-theme"
            />
            {errors.start_date && <span className="text-theme-cont">{errors.start_date.message}</span>}
          </div>

          <div>
            <label className="block text-theme">End Date:</label>
            <input
              type="date"
              {...register("end_date")}
              className="w-full border rounded p-2 outline-theme"
            />
            {errors.end_date && (
              <span className="text-theme-cont">{errors.end_date.message}</span>
            )}
          </div>

          <button type="submit" className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};




export default CreateTournamentForm;
