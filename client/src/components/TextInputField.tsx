import { motion } from "framer-motion"

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
        <motion.div 
            initial={{ opacity: 0, translateY: 30 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{once : false}}
            transition={{
                duration: 0.5,
                delay: 0.1
            }}
            className="w-full my-2"
        >
        {label ? <label htmlFor={name} className="block text-sm text-theme font-medium">{label}</label> : <></>}
        <input
            name={name}
            type={type}
            required={required}
            onChange={onInputChange}
            className="block w-full rounded-md py-1.5 border-[0.15rem] border-theme-gray outline-none focus:border-b-theme sm:leading-6 px-2 transition-colors duration-200"
        />
        {errMsg ? <span className="text-theme-cont">{errMsg}</span> : <></>}
        </motion.div>
    )
}

export default TextInputField
  