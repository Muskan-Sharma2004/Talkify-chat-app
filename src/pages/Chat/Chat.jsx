import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Chat = () => {

  const {chatData,userData} = useContext(AppContext);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    if(chatData && userData){
      setLoading(false);
    }

  },[chatData,userData])

  return (
    <div className='chat'>
      {
        loading
        ?<p className="loading">Loading.....</p>
        : <div className="chat-container">
        <LeftSideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
      }

     
    </div>
  )
}

export default Chat
