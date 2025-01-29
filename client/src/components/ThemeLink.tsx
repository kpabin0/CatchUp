import { motion } from "framer-motion"

interface IThemeLink {
    label : string,
    ostyle? : string,
    url?: string
};

const ThemeLink = ({label, ostyle, url} : IThemeLink) => {
  return (
    <motion.a
        href={url ? url : "#"}
        className={"w-full bg-theme hover:bg-theme-alt text-center p-2 px-4 text-white rounded-md transition-all duration-200 " + (ostyle ? ostyle : "")}
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{once : false}}
        transition={{
            duration: 0.3,
        }}
    >
      {label}
    </motion.a>
  )
}

export default ThemeLink