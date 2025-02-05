import { motion } from "framer-motion"

const BorderDiv = (props : any) => {
  return (
    <motion.div
        className={"border border-theme p-2 m-2 rounded-md hover:shadow-xl hover:rotate-180 transition-all duration-300 " + (props.ostyle ? props.ostyle : "")}
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

export default BorderDiv