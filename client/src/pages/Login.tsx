import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextInputField from '../components/ThemeInputField';
import { backendBaseURL, loggedInStatus } from '../data/utils';
import FullBgCover from '../components/FullBgCover';
import Message from '../components/Message';
import { useInfoHandler } from '../customhook/info';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { info, setInfo } = useInfoHandler();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo(null)
    
    try {   
        const response = await axios.post(backendBaseURL + `/auth/login`, formData);
        
        alert(response.data.message || 'Login successful!');
        // console.log('Login response:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loggedIn', String(true));
        window.location.reload()
        navigate('/dashboard');
      } 
      catch (error: any) {
        console.error('Error during login:', error.response || error.message);
        setInfo(["Login failed", 'error'])
      }
  };

  const handleForgotPassword = () => {
    navigate('/resetpassword');
  };

  useEffect(() => {
    if(loggedInStatus())
    {
      navigate("/home");
    }

  // eslint-disable-next-line
  }, [])

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <FullBgCover />
      
      <div className="rounded-xl shadow-xl w-[25rem] h-[50vh] flex flex-col justify-between items-center bg-theme-w">
        <h2 className="w-full py-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl">
          Welcome back to <span className="uppercase text-4xl font-extrabold block">Catchup</span>
        </h2>

        <form className="w-[90%]" onSubmit={handleFormSubmit}>
         
        {info?.[0] && <Message message={info[0]} type={info[1]} onClose={() => setInfo(null)} />}
       
          <div className="mt-2">
            <TextInputField
              type="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onInputChange={handleInputChange}
              errMsg={!formData.email ? 'Email field is required' : undefined}
              required
            />
          </div>

          <div className="mt-2">
            <TextInputField
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onInputChange={handleInputChange}
              errMsg={!formData.password ? 'Password field is required' : undefined}
              required
            />
          </div>

         
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-theme-cont hover:underline"
          >
            Forgot password?
          </button>

          <button
            type="submit"
            className="mt-4 rounded-md bg-theme p-2 w-full text-xl text-theme-w font-bold hover:bg-theme-alt transition-colors duration-200"
          >
            Sign in
          </button>
        </form>

       
        <p className="my-4 text-sm text-theme-t">
          Not a member?&nbsp;
          <Link to="/register" className="font-semibold text-theme hover:text-theme-alt">
            Register your account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
