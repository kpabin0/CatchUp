import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { TbHandLoveYou } from "react-icons/tb";

function Home() {

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
    </div>
  );
}

export default Home;
