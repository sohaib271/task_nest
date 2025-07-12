const express=require("express");
const router=express.Router();
const userAuth=require("../controller/auth");
const checkTokenAndUser=require("../middlewares/user");

router.post("/register",async(req,res)=>{
  const {name,email,password}=req.body;
   try {
      const user = await userAuth.register(name, email, password);
      return res.json({ msg:user.name });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
});

router.post("/getToken",async(req,res)=>{
  const {email,password}=req.body;
  try {
    const token=await userAuth.generateToken(email,password);
  if(token) return res.json({token:token});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/access", checkTokenAndUser,(req,res)=>{
  return res.json({user:req.user});
});
module.exports=router;