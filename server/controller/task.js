const Task=require("../model/tasks");

class Tasks{
  async uploadTask(title,deadline,createdBy){
    const task=await new Task({title,deadline,createdBy});
    await task.save();
    return task;
  }

  //In-case of admin panel
  async getTask(){
    return await Task.find();
  }

  async deleteTask(id){
    const del=await Task.findByIdAndDelete({_id:id});
    return del;
  }

  async userTasks(id){
    const myTasks=await Task.find({createdBy:id});
    return myTasks;
  }

  async updateStatus(id,status){
    const update=await Task.findByIdAndUpdate(id,{status:status});
    return update;
  }
}

module.exports=new Tasks();