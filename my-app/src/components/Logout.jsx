import React from 'react'
import { Button } from './ChatboxStyle';
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utility/APIRoutes";
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate =useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}




