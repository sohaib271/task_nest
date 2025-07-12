import { useEffect, useState } from "react";
import Task from "./task";
import useUser from "./auth/userHook";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const { data: user } = useUser();
  const userId = user?.id; // Added optional chaining in case user is null
  
  useEffect(() => {
    async function getUserTasks() {
      try {
        if (!userId) return;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/task/mytask/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        
        const result = await response.json();
        setTasks(result.myTask);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    
    getUserTasks();
  }, [userId]); 

  return (
    <div className="mt-3">
      {tasks?.map((task) => (
        <Task key={task.id} t={task} />
      ))}
    </div>
  );
}

export default TaskList;