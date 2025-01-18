import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { TbHandLoveYou } from "react-icons/tb";

const _tempObject = [11, 22, 33];
const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

function Home() {

  const [reqData, setReqData] = useState();

  useEffect(() => {
    const req =  async () => {
      return fetch(`http://localhost:/${PORT_NUMBER}`)
              .then((res) => res.json())
              .then((data) => { setReqData(data); return data;  })
              .catch((error) => { console.log(error);  });
    }

    req();
  })

  return (
    <div className="w-screen h-screen flex flex-col justify-evenly items-center">
      <motion.h1
        className="text-theme text-6xl font-bold uppercase font-mono"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        Catchup <TbHandLoveYou className="inline-block" />
      </motion.h1>
      <div className=" w-[80%] flex flex-row justify-evenly items-center flex-wrap ">
        {
          _tempObject.map((ind) => {
            return <MotionCardExample key={ind} ind={ind} />
          })
        }
      </div>
      <span>Fetched from backend <span className="text-theme-w bg-theme p-2">"{reqData}"</span></span>
    </div>
  );
}

const MotionCardExample = ({ind} : any) => {
  return (
    <motion.div
      className="w-[20rem] h-[20rem] p-2 m-2 flex flex-col justify-evenly items-center hover:shadow-xl rounded-md text-center bg-theme text-theme-w text-2xl font-bold uppercase transition-all duration-200"
      initial={{ translateY:"40%", opacity: 0 }}
      animate={{ translateY:0, opacity: 1 }}
      transition={{ duration : 0.5 }}
    >
      <span className="inline-block text-xl">This is example use of framer motion Card Number : {ind}</span>
      <button className="bg-theme-w text-theme font-bold hover:scale-105 rounded-md mx-auto p-2 px-4">Click Me: {ind}</button>
    </motion.div>
  )
}

export default Home;
