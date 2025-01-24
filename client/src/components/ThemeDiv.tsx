import { motion } from "framer-motion"

const ThemeDiv = (props : any) => {
  return (
    <motion.div
        className={"bg-theme text-theme-w p-2 m-2 rounded-sm hover:bg-theme-alt transition-colors duration-300 " + (props.ostyle ? props.ostyle : "")}
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{once : false}}
        transition={{
            duration: 0.5,
        }}
    >
        {props.children}
    </motion.div>
  )
}

export default ThemeDiv