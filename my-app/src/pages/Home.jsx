import React ,{useState,useEffect} from 'react';
import { ChatContainer } from './HomeStyle';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from '../utility/APIRoutes';
import Contacts from '../components/Contacts';
import Dashboard from '../components/Dashboard';
import Chatbox from '../components/Chatbox';


export default function Home() {
  const navigate=useNavigate();

  const [contacts,setContacts]=useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  const [currentChat, setCurrentChat] = useState(undefined);

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
        {currentUser===undefined? (
          <Dashboard currentUser={currentUser}/>
        ):(
          <Chatbox />
        )}
        
        </div>
      </ChatContainer>
    </>
  )
}
 