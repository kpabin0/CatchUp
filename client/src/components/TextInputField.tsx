import React from 'react'

interface TextInputProps {
    type?: string,
    label?: string,
    name: string,
    errMsg?: string,
    required: boolean,
    onInputChange?: (e : any) => void
}

const TextInputField = ({ type = "text", label, name, errMsg, required, onInputChange }: TextInputProps) => {

    return (
        <div className="w-full my-2">
        {label ? <label htmlFor="email" className="block text-sm text-theme font-medium">{label}</label> : <></>}
        <input
            name={name}
            type={type}
            required={required}
            onChange={onInputChange}
            className="block w-full rounded-md py-1.5 text-theme-main border-[0.15rem] border-theme-gray outline-none focus:border-b-theme-main sm:leading-6 px-2 transition-colors duration-200"
        />
        {errMsg ? <span className="text-red-500">{errMsg}</span> : <></>}
        </div>
    )
}

export default TextInputField
  