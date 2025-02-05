import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import React, { useEffect } from 'react';

interface IMessage {
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info' | string,
    hold?: number,
    onClose: () => void
};


const Message = ({message = "Created Successfully", type="success", hold = 2, onClose} : IMessage) => {

  useEffect(() => {
    if(hold) {
      const timeOutId = setTimeout(() => { onClose(); }, hold*1000);

      return () => clearInterval(timeOutId);
    }

  }, [])

  return (
    <div className={"fixed top-1 right-1 z-50 text-theme-w p-4 space-x-6 rounded-md flex items-center " + (type === "success" ? " bg-theme-green" : "bg-theme-red")}>
        {type === "success" ? <FaCheckCircle /> : <FaWindowClose />}
        <span className="capitalize" >{message}</span>
        <button onClick={() => onClose()}>X</button>
    </div>
    // <div className={"max-w-full mx-auto text-theme-w p-4 space-x-6 rounded-md mb-4 flex items-center justify-between " + (type === "success" ? " bg-theme-green" : "bg-theme-red")}>
    //     {type === "success" ? <FaCheckCircle /> : <FaWindowClose />}
    //     <span className="capitalize" >{message}</span>
    //     <button onClick={() => onClose()}>X</button>
    // </div>
  )
}


export default Message;