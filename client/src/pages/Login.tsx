import TextInputField from '../components/TextInputField';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendBaseURL } from '../data/utils';
import ThemeFormDiv from '../components/ThemeFormDiv';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleInputChange = (e:any) => {
      console.log(e.target.value);
      console.log(formData);
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFormSubmit = async (e:any) => {
      e.preventDefault();
      try {
        console.log(formData);
        const response = await axios.post(backendBaseURL + `/auth/login`, formData);
        alert(response.data.message || 'Login successful!');
        console.log(response.data); 
        navigate('/dashboard'); 
      } catch (error:any) {
        setError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    };
  
    const handleForgotPassword = () => {
      alert('Redirect to Forgot Password Page');
    };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center ">
        
        <img src="/assets/bg.png" alt="bg" className="absolute -z-50 brightness-75 h-full w-full top-0 left-0 object-cover" /> 
        
        <ThemeFormDiv>
            <h2 className="w-full py-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl">
                Welcome back to <span className='uppercase text-4xl font-extrabold block'>Catchup</span>
            </h2>

            <form className="w-[90%]" onSubmit={handleFormSubmit}>
                {error && <span>{error}</span>}
            <div className="mt-2">
                <TextInputField 
                    type="email"
                    label="Email Address"
                    name="email"
                    errMsg={false ? "email field required" : ""}
                    required={true}
                    onInputChange={handleInputChange}
                />
            </div>

            <div className="mt-2">
                <TextInputField
                    type="password"
                    label="Password"
                    name="password"
                    errMsg={false ? "password error" : ""}
                    required={true}
                    onInputChange={handleInputChange}
                />
            </div>
            <button
                type="button"
                onClick={() => handleForgotPassword()}
                className="text-theme-cont hover:underline"
                >
                Forgot password ?
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
        </ThemeFormDiv>
    </section>
  )
}

export default Login