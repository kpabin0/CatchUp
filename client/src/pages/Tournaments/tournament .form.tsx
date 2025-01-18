
import React, { useState, useRef } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

interface TournamentFormData {
  tournamentid: number;
  name: string;
  start: Date;
  end_date: Date;
}

const schema = Yup.object().shape({
  tournamentid: Yup.number()
    .integer()
    .required("Tournament ID is required"),
  name: Yup.string()
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  start: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  end_date: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(Yup.ref("start"), "End date must be after the start date"),
});

const CreateTournamentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TournamentFormData>({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const PORT_NUMBER = "3001";

  const onSubmit: SubmitHandler<TournamentFormData> = async (data: TournamentFormData) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        `http://localhost:${PORT_NUMBER}/tournaments`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Tournament created successfully:", response.data);
      setSuccessMessage("Tournament created successfully!");
      setErrorMessage(null);
      reset();
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
    <section className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[30rem] p-8 bg-white shadow-xl rounded-md">
        <h2 className="text-2xl font-bold text-center py-5 uppercase">Create Tournament</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-4 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              className="text-white font-bold ml-4"
              onClick={() => setSuccessMessage(null)}
            >
              X
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              className="text-white font-bold ml-4"
              onClick={() => setErrorMessage(null)}
            >
              X
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full px-6">
          <div>
            <label className="block text-theme">Tournament ID:</label>
            <input
              type="number"
              {...register("tournamentid")}
              className="w-full border rounded p-2"
              placeholder="Enter Tournament ID"
            />
            {errors.tournamentid && (
              <span className="text-red-500">{errors.tournamentid.message}</span>
            )}
          </div>

          <div>
            <label className="block text-theme">Name:</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded p-2"
              placeholder="Enter Tournament Name"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-theme">Start Date:</label>
            <input
              type="date"
              {...register("start")}
              className="w-full border rounded p-2"
            />
            {errors.start && <span className="text-red-500">{errors.start.message}</span>}
          </div>

          <div>
            <label className="block text-theme">End Date:</label>
            <input
              type="date"
              {...register("end_date")}
              className="w-full border rounded p-2"
            />
            {errors.end_date && (
              <span className="text-red-500">{errors.end_date.message}</span>
            )}
          </div>

          <button type="submit" className="bg-theme text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};



// const CreateTournamentForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<TournamentFormData>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit: SubmitHandler<TournamentFormData> = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("tournamentid")} />
//       {errors.tournamentid && <span>{errors.tournamentid.message}</span>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

export default CreateTournamentForm;
