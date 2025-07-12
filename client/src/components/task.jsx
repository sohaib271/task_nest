import { MdOutlineDelete } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import { useTask } from "./task/taskHook";
import { useLoading } from "./loading/loading";
import { useState } from "react";

function Task({t}){

  const {deleteTask,updateStatus}=useTask();
  const [status,setStatus]=useState(t.status);
  const {isLoading}=useLoading();
  return <>
    <div className="task-item-container d-flex align-items-center gap-2 p-2 bg-light rounded mb-2">
    {isLoading && <p className="text-center">Loading....</p>}
  <input
    type="text"
    className="form-control flex-grow-1"
    placeholder="Enter task..."
    value={t.title}
  />

  <div className="date-input" style={{width: '120px'}}>
    <input
      type="date"
      className="form-control"
      value={t.deadline}
    />
  </div>
  <select 
    className="form-select"
    style={{width: '140px'}}
    value={status}
    onChange={(e)=>setStatus(e.target.value)}
  >
    <option value="Pending">Pending</option>
    <option value="In-Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>
  
  <div className="d-flex gap-1">
    <button onClick={()=>updateStatus(t._id,status)} className="btn btn-sm btn-outline-success">
      <CiSaveUp1 />
    </button>
    <button onClick={()=>deleteTask(t._id)} className="btn btn-sm btn-outline-danger">
      <MdOutlineDelete />
    </button>
  </div>
</div>
  </>
}
export default Task;