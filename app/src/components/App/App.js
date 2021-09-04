import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateWrapper from '../PrivateWrapper/PrivateWrapper';
import Login from '../Login/Login';
import Register from '../Register/Register';


function App() {

  //states that handle/help with conditional rendering/redirection
  const [registered,setRegistered] = useState(false);
  const [user,setUser] =useState('');

  // effect that sets registered to false right after it's changed to true by the 
  // submit handler in the register component, as without it we cannot visit register again
  // after registered is set to true: {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}

  useEffect(()=>{
    setRegistered(false);
  });

  // Logic to save login state to storage, it's a a pain having to log in every single time 
  // https://typeofnan.dev/using-session-storage-in-react-with-hooks/
  function getStorageKey(key,defaultVal){
    const stored_key = sessionStorage.getItem(key);
    if(!stored_key){
      return defaultVal;
    }
    return JSON.parse(stored_key);
  }
  
  const [loggedIn,setLoggedin] = useState(getStorageKey('loggedIn',false));
   
  useEffect(()=>{
    sessionStorage.setItem('loggedIn',JSON.stringify(loggedIn))
  });
 //
  return (
      <div>
        <h1>Ilodivido</h1>
        <BrowserRouter>
        <Switch>
          <Route path="/login">
            {loggedIn ? <Redirect to="/"/> :<Login setLoggedin={setLoggedin} setusername={setUser}/>}
          </Route>
          <Route path='/register'>
            {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}
          </Route>
          <Route path='/'>
            <PrivateWrapper username={user} loggedIn={loggedIn} logout={()=>{setLoggedin(false);console.log('signed out')}}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default App;
