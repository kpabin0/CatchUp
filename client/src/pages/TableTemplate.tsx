import { motion } from 'framer-motion'
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface ITable {
  title?: string,
  th: string[],
  rd?: any[],
  ostyle?: string,
  // this is for the special entry in table or say action
  control?: IControl | null;
};

interface IControl {
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
};

const TableTemplate = ({title, th, rd, ostyle, control}: ITable) => {

  return (
    <section className="min-w-full flex flex-col justify-evenly items-center p-2 sm:p-0">
      {title ? <h1 className="text-2xl text-center my-10 text-theme uppercase font-bold">{title}</h1> :<></>}
        
      <motion.table
        className={"min-w-[60%] rounded-md overflow-hidden sm:text-left text-center bg-theme-w-alt text-ti sm:text-lg"  + (ostyle ? ostyle : "")}
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{once : false}}
        transition={{
            duration: 0.5,
            delay: 0.1
        }}
      >
      <thead className="w-full uppercase">
        {
          th ? th.map((title, ind) => {
            return <th key={ind} className="sm:p-4 border-b text-theme border-theme-cont">{title}</th>
          }):<></>
        }
      <th className="sm:p-4 border-b text-theme border-theme-cont">Action</th> : <></>
      </thead>
      <tbody className="w-full">
        {rd ? rd.map((props, ind) => {
          return <TableRow key={ind} props={props} control={control} />
        }):<></>}
      </tbody>
          
      </motion.table>
    </section>
  )
}

const TableRow = ({props, control} : {props: Object, control: any}) => {
  return (
    <motion.tr 
      initial={{ translateY: 15 }}
      whileInView={{ translateY: 0 }}
      viewport={{once : true}}
      transition={{
          duration: 0.5,
          delay: 0.1 
      }}
      className="w-full sm:p-4 border-b border-theme-g"
    >
      {
        Object.entries(props).map(([k, v], ind) => {
          return <td key={ind} className="sm:p-4 ">{v}</td>
        })
      }
      {/* #Note: control is hardcoded with inspection for only this specific use case might not work for other as intended */}
      {control ? <Control control={control} id={Object.entries(props)[0][1]} />:<Control id={Object.entries(props)[0][1]} />}
    </motion.tr>
  )
}


const Control = ({control, id} : {control?: IControl, id: number}) => {
  return (
    <td className="sm:p-4">
      <Link to={window.location.pathname + `/${id}`}>
      <FaEye
        className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-cont hover:text-theme-w text-theme-cont"
      />
      </Link>
      {
      control ?
      <FaEdit 
        onClick={() => control.handleEdit(id)}
        className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme hover:text-theme-w text-theme"
        /> : <></>
      }
      {
      control ? 
      <FaTrash 
        onClick={() => control.handleDelete(id)}
        className="inline-block rounded-sm cursor-pointer mx-1 h-6 w-6 p-1 hover:bg-theme-red text-theme-red hover:text-theme-w"
      /> : <></>
      }
    </td>
  )
}

export default TableTemplate