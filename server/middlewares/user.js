const userAuth=require("../controller/auth");
const jwt=require("jsonwebtoken");

async function checkTokenAndUser(req,res,next){
  const header=req.headers["authorization"];

  if(!header) return res.json({err:"No user found"});
  const token=header.split(" ")[1];

  if(!token) return res.json({err:"Invalid Credentials"});

  try {
    const user=await userAuth.decodeToken(token);
   
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user=user;
    next();
  } catch (error) {
    return res.json({ message: "Internal server error", error: error.message });
  }
}

module.exports=checkTokenAndUser;