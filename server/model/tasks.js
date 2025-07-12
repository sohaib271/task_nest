const {Schema,model}=require("mongoose");

const schema=new Schema({
  title:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:["Pending","In-Progress","Done"],
    default:"Pending"
  },
  deadline:{
    type:String,
    required:true,
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"users"
  }
},{timestamps:true});

const Task=new model("tasks", schema);

module.exports=Task;