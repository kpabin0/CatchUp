import React from 'react'
import { CgSearchLoading } from "react-icons/cg";

const Loading = ({text = ""}) => {
  return (
    <div className="w-full flex justify-center items-center text-2xl my-10 text-theme animate-pulse uppercase font-mono">
      <span className="">Loading {text} . .</span><CgSearchLoading className="inline-block h-12 w-12"/>
    </div>
  )
}

export default Loading