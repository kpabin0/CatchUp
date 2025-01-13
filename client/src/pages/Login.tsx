import TextInputField from '../components/TextInputField';
import { Link } from 'react-router-dom';

const Login = () => {

    const handleFormSubmit = () => {
        alert("Form submitted");
    }

    const handleForgotPassword = () => {
        alert("Password forget");
    }


  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center ">
        
        <img src="/assets/bg.png" alt="bg" className="absolute -z-50 brightness-75 h-full w-full bg-contain top-0 left-0" /> 
        
        <div className="rounded-xl shadow-xl w-[25rem] h-[50vh] flex flex-col justify-between items-center bg-theme-w ">
            <h2 className="w-full py-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl">
                Welcome back to <span className='uppercase text-4xl font-extrabold block'>Catchup</span>
            </h2>

            <form className="w-[90%]" onSubmit={() => handleFormSubmit()}>
            <div className="mt-2">
                <TextInputField 
                    type="email"
                    label="Email Address"
                    name="email"
                    errMsg={false ? "email field required" : ""}
                    required={true}
                />
            </div>

            <div className="mt-2">
                <TextInputField
                    type="password"
                    label="Password"
                    name="password"
                    errMsg={false ? "password error" : ""}
                    required={true}
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
        </div>
    </section>
  )
}

export default Login