import React from 'react'

interface TextInputProps {
    type: string;
    label: string;
    name: string;
    value: string; // Add value prop
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
    errMsg?: string;
    required?: boolean;
  }

const TextInputField = ({ type = "text", label, name, errMsg, required }: TextInputProps) => {

    return (
        <div className="w-full my-2">
        {label ? <label htmlFor="email" className="block text-sm text-theme font-medium">{label}</label> : <></>}
        <input
            id={name}
            type={type}
            required={required}
            className="block w-full rounded-md py-1.5 text-theme-main border-[0.15rem] border-theme-gray outline-none focus:border-b-theme-main sm:leading-6 px-2 transition-colors duration-200"
        />
        {errMsg ? <span className="text-red-500">{errMsg}</span> : <></>}
        </div>
    )
}

export default TextInputField
  


// interface TextInputProps {
//     type: string;
//     label: string;
//     name: string;
//     value: string; // Add value prop
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
//     errMsg?: string;
//     required?: boolean;
//   }
  
//   const TextInputField: React.FC<TextInputProps> = ({
//     type,
//     label,
//     name,
//     value,
//     onChange,
//     errMsg,
//     required,
//   }) => (
//     <div className="flex flex-col">
//       <label htmlFor={name} className="text-sm font-semibold mb-1">
//         {label}
//       </label>
//       <input
//         id={name}
//         type={type}
//         name={name}
//         value={value} // Controlled input
//         onChange={onChange} // Pass handler
//         required={required}
//         className="p-2 border rounded"
//       />
//       {errMsg && <p className="text-red-500 text-xs mt-1">{errMsg}</p>}
//     </div>
//   );
  
//   export default TextInputField;