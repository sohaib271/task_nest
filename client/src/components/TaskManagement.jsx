import { useNavigate } from "react-router-dom";
import AddTask from "./addtask"
import useUser from "./auth/userHook";
import TaskList from "./taskList"
import loading from "./loading/delay";
import { useLoading } from "./loading/loading";

function TaskManagement(){

  const {data:user}=useUser();
  const {isLoading,startLoading,stopLoading}=useLoading();
  const navi=useNavigate();
  const logout=async()=>{
    startLoading();
    localStorage.removeItem("token");
    await loading(2);
    navi("/login");
    stopLoading();
  }

  if(isLoading) return <p className="text-center">Loading....</p>
  return <>
    <div className='parent p-3 border border-rounded'>
    <h2 className='mb-5'>Task Nest</h2>
    <p>Welcome {user?.name}</p>
    <AddTask />
    <TaskList/>
  </div>
  <button onClick={logout}>Log Out</button>
  </>
}
export default TaskManagement;