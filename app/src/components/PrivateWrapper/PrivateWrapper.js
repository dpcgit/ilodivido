import React from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import SignOut from '../SignOut/SignOut';


function PrivateWrapper({loggedIn,logout}) {
  
  if(!loggedIn){
    return <Redirect to ="/login"/>
  }
  return (
      <div>
        <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/signout" onClick={logout}>Signout</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/preferences">Preferences</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/signout">
            <SignOut/>
          </Route>
          <Route path='/dashboard'>
            <Dashboard/>
          </Route>
          <Route path='/preferences'>
            <Preferences/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default PrivateWrapper;
