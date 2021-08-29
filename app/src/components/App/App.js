import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import Register from '../Register/Register';


function App() {

  //states that handle/help with conditional rendering/redirection
  const [loggedIn,setLoggedin] = useState(false);
  const [registered,setRegistered] = useState(false);
  
  // effect that sets registered to false right after it's changed to true by the 
  // submit handler in the register component, as without it we cannot visit register again
  // after registered is set to true: {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}

  useEffect(()=>{
    setRegistered(false);
  });
   
  return (
      <div>
        <h1>Ilodivido</h1>
        <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path='/register'>
            {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default App;
