import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateWrapper from '../PrivateWrapper/PrivateWrapper';
import Login from '../Login/Login';
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
        <Switch>
          <Route path="/login">
            {loggedIn ? <Redirect to="/"/> :<Login setLoggedin={setLoggedin}/>}
          </Route>
          <Route path='/register'>
            {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}
          </Route>
          <Route path='/'>
            <PrivateWrapper loggedIn={loggedIn} logout={()=>{setLoggedin(false);console.log('signed out')}}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default App;
