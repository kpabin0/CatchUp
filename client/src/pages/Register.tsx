// import React from 'react'
// import TextInputField from '../components/TextInputField'
// import { Link } from 'react-router-dom'
// import { HiUserAdd } from "react-icons/hi";

// const Register = () => {

//     const handleFormSubmit = () => {
//         alert("Register")
//     }


//   return (
//     <section className="h-screen w-screen flex flex-col justify-center items-center">
//         <img src="/assets/bg.png" alt="bg" className="absolute -z-50 brightness-75 h-full w-full bg-contain top-0 left-0" /> 
        
//         <div className="w-[40rem] flex flex-col justify-evenly items-center bg-theme-w shadow-2xl p-8 rounded-xl min-h-[60vh]">
//             <h2 className="w-full py-4 mb-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl grid grid-cols-3">
//                 <span className="col-span-2">Sign Up in <span className='uppercase text-4xl font-extrabold block'>Catchup</span></span>
//                 <HiUserAdd className="m-auto text-theme-w w-20 h-20" />
//             </h2>
//             <form onSubmit={() => handleFormSubmit()} className="w-full flex flex-col items-center text-md" noValidate={false}>
//                 <TextInputField
//                     type="name"
//                     label="Full Name"
//                     name="name"
//                     required={true}
//                 />
//                 <TextInputField
//                     type="email"
//                     label="Email"
//                     name="email"
//                     required={true}
//                 />
//                 <div className="w-full flex flex-row">
//                     <TextInputField
//                         type="password"
//                         label="Password"
//                         name="password"
//                         required={true}
//                     /><span className="mx-2"></span>
//                     <TextInputField
//                         type="password"
//                         label="Confirm Password"
//                         name="confirmPassword"
//                         required={true}
//                     />
//                 </div>
//                 {/* <TextInputField
//                     label="Address"
//                     name="address"
//                     required={true}
//                 /> */}

//                 {/* <div className="w-full">
//                     <label htmlFor="image" className="block text-sm font-medium py-2">
//                         Image
//                     </label>
//                     <input
//                         className="block w-full cursor-pointer min-h-[3rem]"
//                         id="file_input" type="file"
//                         placeholder="Select image"
//                         onChange={(e: any) => {
//                             const uploaded = e.target.files[0];
//                             alert("image uploaded" + uploaded);
//                         }}
//                     />
//                 </div> */}

//                 <button
//                     className=" w-[50%] mb-4 rounded-md border border-theme bg-theme-w px-12 py-3 text-theme transition hover:bg-theme hover:text-theme-w"
//                 >
//                     Create an account
//                 </button>
//                 <span className="mt-4 text-theme-t sm:mt-0 col-span-6">
//                     Already have an account?&nbsp;
//                     <Link to="/login" className="text-theme font-bold underline">Log in</Link>.
//                 </span>
//             </form>
//         </div>
//     </section>
//   )
// }

// export default Register


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiUserAdd } from "react-icons/hi";

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
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
        const response = await axios.post('http://localhost:8080/auth/register', {
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
    <section className="h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      <img
        src="/assets/bg.png"
        alt="Background"
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-75"
      />
      <div className="relative z-10 w-96 bg-white shadow-lg p-6 rounded-lg">
        <div className="text-center mb-6">
          <HiUserAdd className="mx-auto text-6xl text-blue-500" />
          <h2 className="text-xl font-bold mt-4">Sign Up for Catchup</h2>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Create an Account
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 font-bold cursor-pointer"
          >
            Log in
          </span>.
        </p>
      </div>
    </section>
  );
};

export default Register;
