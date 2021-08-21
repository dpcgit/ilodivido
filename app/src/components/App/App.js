import React, { useState } from 'react';
import './App.css';
import { Link,BrowserRouter, Route,Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import Register from '../Register/Register';


function App() {

  //state that handle//helps with conditional rendering
  const [loggedIn,setLoggedin] = useState(false);

  if(loggedIn===false){
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
            <Register/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h1>Ilodivido</h1>
      <BrowserRouter>
      <nav>
          <ul>
            <li><Link to="/preferences">Prefrences</Link></li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
