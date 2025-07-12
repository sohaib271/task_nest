const {Schema,model}=require("mongoose");

const schema=new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  }
},{timestamps:true});

const User=new model("users", schema);

module.exports=User;
