import TextInputField from '../components/ThemeInputField'
import { Link } from 'react-router-dom'
import { HiUserAdd } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendBaseURL } from '../data/utils';
import ThemeFormDiv from '../components/ThemeFormDiv';
import FullBgCover from '../components/FullBgCover';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
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
        const response = await axios.post(backendBaseURL + `/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      
        alert(response.data.message || "Registration successful!");
        setTimeout(() => navigate('/login'), 1000);
      } catch (error: any) {
        console.error("Error registering user:", error.response || error.message);
        const errorMessage = error.response?.data?.message || "An error occurred during registration.";
        alert(errorMessage);
      }
      
  };
  

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <FullBgCover />

      <ThemeFormDiv ostyle="p-4">
          <h2 className="w-full py-4 mb-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl grid grid-cols-3">
              <span className="col-span-2">Sign Up in <span className='uppercase text-4xl font-extrabold block'>Catchup</span></span>
              <HiUserAdd className="m-auto text-theme-w w-20 h-20" />
          </h2>
          <form onSubmit={handleFormSubmit} className="w-[90%] flex flex-col items-center text-md" noValidate={false}>
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
      </ThemeFormDiv>
    </section>
  );
};

export default Register

