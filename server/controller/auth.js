const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

class UserAuth{
  async hashPassword(password){
    return await bcrypt.hash(password,10);
  }

  async findUser(email){
    return await User.findOne({email});
  }

  async register(name,email,password){
    const isUser=await this.findUser(email);
    if(isUser) throw new Error("Email already exists");
    const hashedPassword=await this.hashPassword(password);
    const newUser=await new User({name:name,email:email,password:hashedPassword});
    await newUser.save();
    return newUser;
   
  }

  async generateToken(email,password){
    const isUser=await this.findUser(email);

    if(!isUser) throw new Error("Incorrect Email");

    const isMatch=await bcrypt.compare(password,isUser.password);
    if(!isMatch) throw new Error("Incorrect Password");

    const token=jwt.sign({
      id:isUser._id,email:isUser.email,name:isUser.name
    },process.env.SECRET_KEY, {expiresIn:"1h"});

    return token;
  }

  async decodeToken(token){
    try {
      return jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
      return {};
    }
  }
}

module.exports=new UserAuth();