import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import {Link} from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    };


  return !addNewChat ? (
    <div  className= 'SidebarChat'>
      <Avatar src='https://avatars.dicebear.com/api/human/ghf.svg'/>

      <div className= 'info_sidebarchat'>
          <h2>{name}</h2>
          <p>last message....</p>
      </div>

    </div>
  ):(
    <div onClick={createChat} 
    className="sidebarChat">
        <h2>  Add New Chat  </h2>
    </div>
  );
}

export default SidebarChat;
