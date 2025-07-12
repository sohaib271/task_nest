import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useState } from "react";
import { useLoading } from "./loading/loading";
import loading from "./loading/delay";

function Register(){
  const [error,setError]=useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {isLoading,startLoading,stopLoading}=useLoading();
  const navi=useNavigate();

  const signup=async(data)=>{
    
    const response=await fetch(`${import.meta.env.VITE_API_URL}/user/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.name,email:data.email,password:data.password})});

    const result=await response.json();
    if(result.msg) startLoading(); await loading(2); navi("/login"); stopLoading();
    if(result.error) setError("Something went Wrong");
  }
  return <>
    <div className="log p-3 border border-rounded">
      {isLoading && <p className="text-center">Loading....</p>}
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleSubmit(signup)}>
        <p className="text-center text-danger">{error}</p>
        <div className="mb-3">
    <label  className="form-label">Name</label>
    <input {...register("name", { required: "Full name is required" })} type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" {...register("email", { required: "Email is required" })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  {...register("password", { required: "Password is required" })} className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
<p>Already have an account?<span><Link to="/login">Log in</Link></span></p>
    </div>
  </>
}
export default Register;