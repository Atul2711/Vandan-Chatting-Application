import React ,{useState,useEffect,useRef} from 'react';
import { ChatContainer } from './HomeStyle';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute ,host } from '../utility/APIRoutes';
import Contacts from '../components/Contacts';
import Dashboard from '../components/Dashboard';
import Chatbox from '../components/Chatbox';
import {io} from "socket.io-client";


export default function Home() {
  const navigate=useNavigate();
  const socket=useRef();
  const [contacts,setContacts]=useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  
  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <ChatContainer>
        <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {currentChat===undefined? (
          <Dashboard currentUser={currentUser}/>
        ):(
          <Chatbox currentChat={currentChat} currentUser={currentUser}  socket={socket} />
        )}
        
        </div>
      </ChatContainer>
    </>
  )
}
 