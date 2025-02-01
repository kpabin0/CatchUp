import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendBaseURL } from "../data/utils";
import { FaUserEdit } from "react-icons/fa";
import TextInputField from "../components/ThemeInputField";
import FullBgCover from "../components/FullBgCover";
import ThemeFormDiv from "../components/ThemeFormDiv";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
      });
    const navigate = useNavigate();

    const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(formData)
    setFormData({ ...formData, [name]: value });
    };
    
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(backendBaseURL + `/auth/reset`, {
        email: formData.email,
        newPassword: formData.password,
      });
      
      
      console.log("Password reset response:", response);

      if (response.status === 200) {
        alert("Password reset successful! Please log in.");
        navigate("/login");
      }
    } catch (error: any) {
        console.error("Error resetting password:", error.response?.data);
        alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
        <FullBgCover />

        <ThemeFormDiv ostyle="w-[20rem]">
          <h2 className="w-full py-4 mb-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl ">
              <FaUserEdit className="m-auto text-theme-w w-20 h-20" />
              <span className='uppercase text-2xl font-extrabold block'>Reset Password</span>
          </h2>
        <form onSubmit={handleFormSubmit} className="w-[90%] h-[70%] flex flex-col justify-evenly items-center text-md" >
            <TextInputField
                type="email"
                label="Email"
                name="email"
                required={true}
                onInputChange={handleInputChange}

            />
            <div className="w-full flex flex-row">
                <TextInputField
                    type="password"
                    label="Password"
                    name="password"
                    required={true}
                    onInputChange={handleInputChange}
                />
                <span className="mx-2"></span>
                <TextInputField
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    required={true}
                    onInputChange={handleInputChange}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-theme text-theme-w py-2 px-4 rounded hover:bg-theme-alt"
            >
            Reset Password
            </button>
            <span className="mt-4 text-theme-t sm:mt-0 col-span-6">
                  or &nbsp;
                <Link to="/login" className="text-theme font-bold underline">Log in</Link>
            </span>
        </form>
        </ThemeFormDiv>
    </section>
    );
};

export default ResetPassword;
