
import { motion } from "framer-motion";

interface IThemeInputField {
  type?: "text" | "number" | "email" | "password" | "date",
  label?: string,
  name: string,
  value?: string,
  placeholder?: string,
  errMsg?: string,
  required?: boolean,
  readOnly?: boolean,
  ostyle? : string,
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ThemeInputField = ({
  type = "text",
  label,
  name,
  value, 
  placeholder,
  errMsg,
  required,
  readOnly,
  ostyle,
  onInputChange,
}: IThemeInputField) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      className={"w-full my-2 " + (ostyle ? ostyle : "")}
    >
      {label && (
        <label htmlFor={name} className="block text-sm text-theme font-bold capitalize">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value} 
        placeholder={placeholder}
        required={required}
        onChange={onInputChange}
        readOnly={readOnly}
        className="block w-full rounded-md py-1.5 border-[0.15rem] border-theme-gray outline-none focus:border-b-theme sm:leading-6 px-2 transition-colors duration-200 "
      />
      {errMsg && <span className="text-theme-red">{errMsg}</span>}
    </motion.div>
  );
};

export default ThemeInputField;
