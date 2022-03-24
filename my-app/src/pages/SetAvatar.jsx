import React, { useState,useEffect } from 'react';
import {Container} from './SetAvatarStyle';
import {useNavigate} from 'react-router-dom';
import loader from '../assets/loader.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utility/APIRoutes';
import { Buffer } from "buffer";


export default function SetAvatar() {
  const navigate=useNavigate();
  const api = "https://api.multiavatar.com/4645627";

  const [avatars,setAvatars]=useState([]);
  const [isLoading,setLoading]=useState(true);
  const [selectedAvatar,setSelectedAvatar]=useState(undefined);
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  }, []);

// function refresh(){
//   window.location.reload(true);
// }

const refresh=async () => {
  setLoading(false);
  const data = [];
  for (let i = 0; i < 4; i++) {
    const image = await axios.get(
      `${api}/${Math.round(Math.random() * 1000)}`
    );
    const buffer = new Buffer(image.data);
    data.push(buffer.toString("base64"));
  }
  setAvatars(data);
  setLoading(false);
};

  return (
    <>
    {isLoading?(
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ):(
    <Container>
    <div className='title-container'>
      <h1>
        Pick your style
      </h1>
    </div>
    <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
</div>
<button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <button onClick={refresh} >Refresh</button>
    <ToastContainer />
    </Container>)}
    </>
  )
}
