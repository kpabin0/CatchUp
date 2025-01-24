import React from 'react'
import TextInputField from '../components/TextInputField'
import { Link } from 'react-router-dom'
import { HiUserAdd } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const navigate = useNavigate();
    
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        console.log(formData)
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFormSubmit = async (e: any) => {
        e.preventDefault();
      
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
      
        try {
            const response = await axios.post(`http://localhost:${PORT_NUMBER}/auth/register`, {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            });
          
            alert(response.data.message || "Registration successful!");
            navigate('/login');
          } catch (error: any) {
            console.error("Error registering user:", error.response || error.message);
            const errorMessage =
              error.response?.data?.message || "An error occurred during registration.";
            alert(errorMessage);
          }
          
      };
      
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
        <img src="/assets/bg.png" alt="bg" className="absolute -z-50 brightness-75 h-full w-full bg-contain top-0 left-0" /> 
        
        <div className="w-[30rem] flex flex-col justify-evenly items-center bg-theme-w shadow-2xl p-8 rounded-xl min-h-[60vh]">
            <h2 className="w-full py-4 mb-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl grid grid-cols-3">
                <span className="col-span-2">Sign Up in <span className='uppercase text-4xl font-extrabold block'>Catchup</span></span>
                <HiUserAdd className="m-auto text-theme-w w-20 h-20" />
            </h2>
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center text-md" noValidate={false}>
                <TextInputField
                    type="name"
                    label="Full Name"
                    name="name"
                    required={true}
                    onInputChange={handleInputChange}
                />
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
                    className=" w-[100%] my-4 rounded-md border border-theme bg-theme-w px-12 py-3 text-theme transition hover:bg-theme hover:text-theme-w"
                >
                    Create an account
                </button>
                <span className="mt-4 text-theme-t sm:mt-0 col-span-6">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-theme font-bold underline">Log in</Link>.
                </span>
            </form>
        </div>
    </section>
  )
}

export default Register