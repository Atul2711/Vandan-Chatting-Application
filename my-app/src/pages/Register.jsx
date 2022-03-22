import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {FormContainer} from './RegisterStyle'

export default function Register() {

const [inputs,setInputs]=useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});



const handleSubmit=(event)=>{
    event.preventDefault();
    alert("Button clicked");
}


const handleChange=(event)=>{
  const {name,value}=event.target;
    setInputs({...inputs,[name]:value});
}
  return (
    <FormContainer>
        <form onSubmit={handleSubmit}>
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
  )
}
