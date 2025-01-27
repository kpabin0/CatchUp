import { motion } from "framer-motion"

const BasicDiv = (props : any) => {
  return (
    <motion.div
        className={"p-2 flex flex-col justify-evenly items-center " + (props.ostyle ? props.ostyle : "")}
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{once : false}}
        transition={{
            duration: 0.6,
            delay: 0.1
        }}
    >
        {props.children}
    </motion.div>
  )
}

export default BasicDiv