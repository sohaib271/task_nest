import { useLoading } from "../loading/loading";
import loading from "../loading/delay";

export const useTask=()=>{
const {startLoading,stopLoading}=useLoading();
  async function addTask(title,deadline,createdBy){
    startLoading();
    await loading(2);
    const response=await fetch(`${import.meta.env.VITE_API_URL}/task/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:title,deadline:deadline,createdBy:createdBy})});

    try {
      const result=await response.json();
      if(result.msg) stopLoading(); return result.msg;
    } catch (error) {
      return error.message;
    }
  }
  async function deleteTask(id){
    startLoading();
    await loading(2);
    const res=await fetch(`${import.meta.env.VITE_API_URL}/task/delete/${id}`,{method:"DELETE"});
     try {
      const result=await res.json();
      if(result.msg) stopLoading(); return result.msg;
    } catch (error) {
      return error.message;
    }
  }

  async function updateStatus(id,status){
    startLoading();
    await loading(2);
    const res=await fetch(`${import.meta.env.VITE_API_URL}/task/update/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});
     try {
      const result=await res.json();
      if(result.msg) stopLoading(); return result.msg;
    } catch (error) {
      return error.message;
    }
  }
  return {addTask,deleteTask,updateStatus};
}