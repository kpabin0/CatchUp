import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { ITournamentForm } from "../../data/ITypes";
import { backendBaseURL } from "../../data/utils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

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

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. Redirecting to login...");
      navigate("/login"); 
      return;
    }

    try {
      const decoded: any = jwtDecode(token); // Decode the JWT token
      console.log("Decoded Token:", decoded);
      if (decoded.isAdmin) {
        setIsAdmin(true);
        console.log("User is an admin");
      } else {
        console.log("User is not an admin. isAdmin:", decoded.isAdmin);
        navigate("/unauthorized"); 
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

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
        <h2 className="w-full py-6 text-2xl font-extrabold uppercase bg-theme text-theme-w text-center mb-5">
          Create Tournament
        </h2>

        {successMessage && <Message message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />}
        {errorMessage && <Message message={errorMessage} type="error" onClose={() => setErrorMessage(null)} />}

        {isAdmin ? (
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
              {errors.start_date && (
                <span className="text-theme-cont">{errors.start_date.message}</span>
              )}
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

            <button
              type="submit"
              className="bg-theme hover:bg-theme-alt text-theme-w px-4 py-2 rounded mt-4"
            >
              Create Tournament
            </button>
          </form>
        ) : (
          <div className="text-center text-theme-cont">
            You do not have permission to create a tournament. Access is restricted to admins only.
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateTournamentForm;
