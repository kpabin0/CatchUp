import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendBaseURL } from "../data/utils";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
     // const response = await axios.post(backendBaseURL + `/password/reset`, data);
      const response = await axios.post(backendBaseURL + `/password/reset`, {
        email,
        newPassword: password,
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 shadow-md rounded w-96"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
