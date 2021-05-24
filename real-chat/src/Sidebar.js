import React, { useState , useEffect } from 'react'
import "./Sidebar.css"
import {Avatar,IconButton} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import ChatIcon from "@material-ui/icons/Chat"
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from "./SidebarChat"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import db from "./firebase"
import {useStateValue} from "./StateProvider"
function SideBar() {
    const [{user},dispatch] = useStateValue()
    const[rooms,setRooms] = useState([])
    useEffect(() => {
        const unSubscribe= db.collection("rooms").onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        );
        return ()=>{
            unSubscribe()
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebarHeaderRight">  
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>  
                    <IconButton>
                        <ChatIcon />
                    </IconButton>  
                    <IconButton>
                        <MoreVertIcon /> 
                    </IconButton>  
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="searchContainer">
                    <SearchIcon />
                    <input placeholder="search chat or find new one" type="text" />
                </div>    
            </div>
            <div className="sidebarChats">
                <SidebarChat addNewChat />
                {   rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                )

                )}
            </div>
        </div>
    )
}

export default SideBar
