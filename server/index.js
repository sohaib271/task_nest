require("dotenv").config();
const mongoose=require("mongoose");
const cors=require("cors");
const express=require("express");
const userRouter=require("./routes/user");
const taskrouter=require("./routes/task");

const app=express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,}));

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>console.log("Database Connected"))
.catch(err => console.error("Connection error:", err));

app.use("/user",userRouter);
app.use("/task",taskrouter);

app.listen(process.env.PORT,()=> console.log("Server started"));

