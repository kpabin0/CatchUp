import { motion } from 'framer-motion'

const FormWrapper = (props: any) => {

    return (
      <section className="min-h-screen min-w-full flex flex-col justify-evenly items-center">
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
          {props.title ? <h1 className="text-3xl text-center my-6 text-theme uppercase font-extrabold">{props?.title}</h1> :<></>}
          {props.children}
        </motion.div>
      </section>
    );
  };
  
  export default FormWrapper;
    
  