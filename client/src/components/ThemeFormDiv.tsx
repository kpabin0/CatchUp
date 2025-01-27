import { motion } from 'framer-motion'

const ThemeFormDiv = (props : any) => {
  return (
    <motion.div 
        className={"rounded-xl shadow-xl min-w-[25rem] min-h-[50vh] flex flex-col justify-between items-center bg-theme-w "  + (props.ostyle ? props.ostyle : "")}
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{once : false}}
        transition={{
            duration: 0.5,
            delay: 0.1
        }}
    >
        {props.children}
    </motion.div>
  )
}

export default ThemeFormDiv