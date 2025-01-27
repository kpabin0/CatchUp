import { motion } from "framer-motion"

interface IThemeLink {
    label : string,
    style? : string,
    url?: string
};

const ThemeLink = ({label, style, url} : IThemeLink) => {
  return (
    <motion.a
        href={url ? url : "#"}
        className={"bg-theme hover:bg-theme-alt p-2 px-4 text-white rounded-md transition-all duration-200 " + (style ? style : "")}
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