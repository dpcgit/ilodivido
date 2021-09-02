import React from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import SignOut from '../SignOut/SignOut';
import AddTool from '../AddTool/AddTool'

function PrivateWrapper({loggedIn,logout,username}) {
  
  if(!loggedIn){
    return <Redirect to ="/login"/>
  }
  return (
      <div>
        <BrowserRouter>
        Welcome {username}
        <nav>
          <ul>
            <li><Link to="/signout" onClick={logout}>Signout</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/preferences">Preferences</Link></li>
            <li><Link to="/add-tool">Add tool</Link></li>
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
          <Route path='/add-tool'>
            <AddTool user_name={username}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default PrivateWrapper;
