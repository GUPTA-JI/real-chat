import React, { useState } from 'react';
import './App.css';
import SideBar from './Sidebar'
import Chat from "./Chat"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from "./Login"
import {useStateValue} from "./StateProvider"
function App() {
  const [{user},dispatch] = useStateValue()
  return (
    <div className="app">
    {!user?(<Login />):<div className="AppBody">
        <Router>
          <SideBar />
          <Switch>
            <Route exact path="/">
              <Chat />
            </Route>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router>

      </div>}
    
      
    </div>
  );
}

export default App;
