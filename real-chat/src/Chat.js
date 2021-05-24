import React ,{useState , useEffect} from 'react'
import "./Chat.css"
import {useParams} from "react-router-dom"
import { Avatar, IconButton } from "@material-ui/core"
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from './firebase'
import {useStateValue} from "./StateProvider"
import firebase from "firebase"
export default function Chat() {
    const [{user},dispatch] = useStateValue()
    const {roomId} = useParams("")
    const [roomName,setRoomName] = useState("")
    const [input,setInput] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc").onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ))
        }
    }, [roomId])
   
    const SendMessage = (e)=>{
        e.preventDefault()
        

        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }
    return (
        <div className="chat">
            <div className="chatHeader">
                <Avatar />
                <div className="chatHeaderInfo">
                    <h2>{roomName}</h2>
                    <p>{messages[messages.length-1]?.timestamp?.toDate().toUTCString()}</p>
                </div>
                <div className="ChatHeaderRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>


            <div className="chatBody">
                {messages.map(message=>(
                    <div className={`chatMessage ${message.name===user.displayName&&'chatReciever'}`}>
                        <span className="chatName">{message.name}</span>
                        <p>{message.message}
                            <span className="chatTimeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>   
                    </div>
                ))}
                
            </div>


            <div className="chatFooter">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="Type A Message" value={input} onChange={(e)=>setInput(e.target.value)}/>
                    <button onClick={SendMessage} type="submit">send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
