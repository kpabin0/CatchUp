import { FaCheckCircle, FaWindowClose } from "react-icons/fa";

interface IMessage {
    message: string,
    type?: string,
    onClose: () => void
};


const Message = ({message = "Created Successfully", type="success", onClose} : IMessage) => {
  return (
    <div className={"max-w-full mx-auto text-theme-w p-4 space-x-6 rounded-md mb-4 flex items-center justify-between " + (type === "success" ? " bg-theme-green" : "bg-theme-red")}>
        {type === "success" ? <FaCheckCircle /> : <FaWindowClose />}
        <span className="capitalize" >{message}</span>
        <button onClick={() => onClose()}>X</button>
    </div>
  )
}

export default Message