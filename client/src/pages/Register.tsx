import React from 'react'
import TextInputField from '../components/TextInputField'
import { Link } from 'react-router-dom'
import { HiUserAdd } from "react-icons/hi";

const Register = () => {

    const handleFormSubmit = () => {
        alert("Register")
    }


  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
        <img src="/assets/bg.png" alt="bg" className="absolute -z-50 brightness-75 h-full w-full bg-contain top-0 left-0" /> 
        
        <div className="w-[40rem] flex flex-col justify-evenly items-center bg-theme-w shadow-2xl p-8 rounded-xl min-h-[60vh]">
            <h2 className="w-full py-4 mb-8 text-center text-sm font-light bg-theme text-theme-w rounded-t-xl grid grid-cols-3">
                <span className="col-span-2">Sign Up in <span className='uppercase text-4xl font-extrabold block'>Catchup</span></span>
                <HiUserAdd className="m-auto text-theme-w w-20 h-20" />
            </h2>
            <form onSubmit={() => handleFormSubmit()} className="w-full flex flex-col items-center text-md" noValidate={false}>
                <TextInputField
                    type="name"
                    label="Full Name"
                    name="name"
                    required={true}
                />
                <TextInputField
                    type="email"
                    label="Email"
                    name="email"
                    required={true}
                />
                <div className="w-full flex flex-row">
                    <TextInputField
                        type="password"
                        label="Password"
                        name="password"
                        required={true}
                    /><span className="mx-2"></span>
                    <TextInputField
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        required={true}
                    />
                </div>
                <TextInputField
                    label="Address"
                    name="address"
                    required={true}
                />

                <div className="w-full">
                    <label htmlFor="image" className="block text-sm font-medium py-2">
                        Image
                    </label>
                    <input
                        className="block w-full cursor-pointer min-h-[3rem]"
                        id="file_input" type="file"
                        placeholder="Select image"
                        onChange={(e: any) => {
                            const uploaded = e.target.files[0];
                            alert("image uploaded" + uploaded);
                        }}
                    />
                </div>

                <button
                    className=" w-[50%] mb-4 rounded-md border border-theme bg-theme-w px-12 py-3 text-theme transition hover:bg-theme hover:text-theme-w"
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