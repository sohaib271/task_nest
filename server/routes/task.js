const express=require("express");
const router=express.Router();
const Task=require("../controller/task");

router.post("/add",async(req,res)=>{
  const {title,deadline,createdBy}=req.body;
  try {
    const task=await Task.uploadTask(title,deadline,createdBy);
    if(task) return res.json({msg:"Task Added"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/mytask/:id",async(req,res)=>{
  const id=req.params.id;
  try {
    const myTask=await Task.userTasks(id);
    return res.json({myTask});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id",async(req,res)=>{
  const id=req.params.id;
  try {
    const del=await Task.deleteTask(id);
    if(del) return res.json({msg:"Task deleted"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.patch("/update/:id",async(req,res)=>{
  const id=req.params.id;
  const status=req.body.status;

  try {
    const update=await Task.updateStatus(id,status);
    if(update) return res.json({msg:"Status Updated"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports=router;