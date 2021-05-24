import React from 'react'
import {Button} from "@material-ui/core"
import './Login.css'
import {auth , provider} from './firebase'
import {useStateValue} from "./StateProvider"
import {actionTypes} from "./reducer"
function Login() {
    const [{},dispatch] = useStateValue()
    const SignIn = ()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch(err=>{
            alert(err.message)
        })
    }
    return (
        <div className="login">
            <div className="loginContainer">
                <img src="https://www.iconfinder.com/data/icons/communication-media-malibu-vol-1/128/mobile-messaging-512.png" 
                    alt=""
                />
                <div className="loginText">
                    <h1>Sign In To Real Chat</h1>
                </div>
                <Button onClick={SignIn}> 
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
