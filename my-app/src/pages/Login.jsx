import React, { useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FormContainer} from './RegisterStyle';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utility/APIRoutes';


export default function Register() {

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
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
    setValues({
      ...values,[name]:value
    });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit=async(event)=>{
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };
  return (
    <>
    <FormContainer>
        <form onSubmit={handleSubmit} >
        <div className="brand">
            <img src="" alt="logo" />
            <h1>vandan</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
           autoComplete='off'
           onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"    
            onChange={handleChange}
          />
 
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create now!</Link>
          </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>

  );
}
