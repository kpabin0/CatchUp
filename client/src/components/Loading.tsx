import React from 'react'
import { CgSearchLoading } from "react-icons/cg";

const Loading = ({text = ""}) => {
  return (
    <div className="text-3xl my-10 text-theme animate-pulse uppercase font-mono">
      <span>Loading {text} . . </span><CgSearchLoading className="inline-block h-12 w-12"/>
    </div>
  )
}

export default Loading