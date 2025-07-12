import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import loading from "./loading/delay";
import { useLoading } from "./loading/loading";
import { useState } from "react";

function Login(){
  const navi=useNavigate();
  const [error,setError]=useState("")
  const {isLoading,startLoading,stopLoading}=useLoading();
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  const login=async(data)=>{
    const res=await fetch(`${import.meta.env.VITE_API_URL}/user/getToken`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:data.email,password:data.password})});

    const result=await res.json();    
    if(result.token) {localStorage.setItem("token",result.token); startLoading(); await loading(2);  navi("/mydashboard"); stopLoading();
    }else setError("Email or password incorrect");
  }

  if(isLoading) return <p className="text-center">Loading....</p>
  return <>
    <div className='log p-3 border border-rounded'>
      <h2 className="mb-3 text-center">Log In</h2>
      <form onSubmit={handleSubmit(login)}>
        <p className="text-center text-danger">{error}</p>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  {...register("email", { required: "Email is required" })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  {...register("password", { required: "Password required" })} className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Log in</button>
  <p>Don't have an account?<span><Link to="/register">Register</Link></span></p>
</form>
    </div>
  </>
}
export default Login;