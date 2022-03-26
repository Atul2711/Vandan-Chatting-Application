import React, { useState,useEffect,useRef } from 'react';
import { ChatContainerbox } from './ChatboxStyle';
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import { sendMessageRoute } from '../utility/APIRoutes';
import { recieveMessageRoute } from '../utility/APIRoutes';
import { v4 as uuidv4 } from "uuid";

export default function Chatbox({currentChat,currentUser,socket}) {

  const [messages,setMessages]=useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMsg=async(msg)=>{
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
      await axios.post(sendMessageRoute,{
        from:data._id,
        to:currentChat._id,
        message:msg,
      });
      const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }

  useEffect( async() => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

   const response=await axios.post(recieveMessageRoute,
    {
      from:data._id,
      to:currentChat._id,
    });
    setMessages(response.data);

  }, [currentChat])

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);
  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <>
      <ChatContainerbox>
       <div className='chat-header'>
         <div className='user-details'>
           <div className='avatar'>
           <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
           </div>
           <div className='username'>
             <h3>{currentChat.username}</h3>
           </div>
         </div>
         <Logout />
       </div>
       <div className='chat-messages'>
          {
            messages.map((message)=>{
              return (
                <div ref={scrollRef} key={uuidv4()}>
                <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
              </div>
              );
            })
          }
       </div>


         <ChatInput handleSendMsg={handleSendMsg} />
      </ChatContainerbox>
    </>
  )
}
