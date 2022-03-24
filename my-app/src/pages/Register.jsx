import React, { useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FormContainer} from './RegisterStyle';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utility/APIRoutes';


export default function Register() {

const navigate=useNavigate();

const [inputs,setInputs]=useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

useEffect(() => {
  if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navigate("/");
  }
}, []);


const handleChange=(event)=>{
  const {name,value}=event.target;
    setInputs({...inputs,[name]:value});
};

const handleValidation=()=>{
  const {username,email,password,confirmPassword}=inputs;
  if(password!==confirmPassword){
    toast.error("Password and Confirm password should be same !",toastOptions);
    return false;
  }else if(username.length<3){
    toast.error("Username should be of atleast 3 characters",toastOptions);
    return false;
  }else if(password.length<5){
    toast.error("Password should be atleast 5 characters long !",toastOptions);
    return false;
  }else if(email==="" || username==="" || password===""){
    toast.error("Fields are required !",toastOptions);
    return false;
  }
  return true;
}

const handleSubmit=async (e)=>{
  e.preventDefault();

 if(handleValidation()){
  const {username,email,password}=inputs;
  const {data}=await axios.post(registerRoute,{
    username,email,password
  }) ;

  if(data.status===false){
    toast.error(data.msg,toastOptions);
  }

  if(data.status===true){
    localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(data.user)
    );
    navigate('/login');
  }
 }
};

  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
        <div className="brand">
            <img src="" alt="logo" />
            <h1>vandan</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>

  )
}
