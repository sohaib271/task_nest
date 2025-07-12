import { useState } from "react";
import useUser from "./auth/userHook";
import { useTask } from "./task/taskHook";
import { useLoading } from "./loading/loading";

function AddTask(){

  const [task,setTask]=useState("");
  const [deadline,setDeadline]=useState("");
  const {data:user}=useUser();
  const {isLoading}=useLoading();
  const {addTask}=useTask();

  return <>
    <div className="input-group mb-3 w-75">
    {isLoading && <p className="text-center">Loading.....</p>}
  <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Task"/>
</div>
<div className="input-group mb-3 w-75">
  <input type="date" value={deadline} onChange={(e)=> setDeadline(e.target.value)} className="form-control" placeholder="Deadline"/>
</div>
 <button onClick={()=>addTask(task,deadline,user.id)} className="input-group-text bg-primary text-white" id="inputGroup-sizing-default">Add</button>
  </>
};

export default AddTask;