import { motion } from "framer-motion"

interface IThemeButton {
    label: string,
    style?: string,
    type?: "button" | "submit" | "reset",
    callback? : () => void 
};

const ThemeButton = ({label, style, type, callback} : IThemeButton) => {
  return (
    <motion.button
        type={type ? type : "button"}
        onClick={callback ? () => callback() : () => {}}
        className={"bg-theme hover:bg-theme-alt p-2 px-4 text-white rounded-md transition-all duration-200 " + (style ? style : "")}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{once : false}}
        transition={{
            duration: 0.6,
            delay: 0.1
        }}
    >
        {label}
    </motion.button>
  )
}

export default ThemeButton