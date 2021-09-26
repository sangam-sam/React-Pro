import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";


function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();


    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");

    }

  return (<div className="chat">
    <div className="header_chat">
            
        <Avatar src='https://avatars.dicebear.com/api/human/ghf.svg'/>

        <div className="info_chat"> 
        <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
        </div>
       
        <div className="Rheader_chat"> 
        <IconButton>
            <SearchOutlined />
        </IconButton>
        <IconButton>
            <AttachFile />
        </IconButton>
        <IconButton>
            <MoreVertIcon />
        </IconButton>
        
        </div>

    </div>

    <div className="body_chat">
    {messages.map(message => (
                    <p className={`msg ${ message.name == user.displayName && 'rmsg'}`}>
                        {message.message}
                        <span className="time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
    </div>

    <div className="footer_chat">
        <form>
            <input value={input} onChange={e => setInput(e.target.value)}
             placeholder="Type your message"type="text" />
            <button onClick={sendMessage} type="submit">Send</button>
        </form>
        <MicIcon />
    </div>
  </div>
  );
}

export default Chat;
