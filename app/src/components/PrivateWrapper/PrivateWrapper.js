import React from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Preferences from '../Preferences/Preferences';
import SignOut from '../SignOut/SignOut';
import AddTool from '../AddTool/AddTool'
import SearchTool from '../SearchTool/SearchTool'

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
            <li><Link to="/preferences">Preferences</Link></li>
            <li><Link to="/add-tool">Add tool</Link></li>
            <li><Link to="/search-tool">Search tool</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/signout">
            <SignOut/>
          </Route>
          <Route path='/preferences'>
            <Preferences/>
          </Route>
          <Route path='/add-tool'>
            <AddTool user_name={username}/>
          </Route>
          <Route path='/search-tool'>
            <SearchTool user_name={username}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default PrivateWrapper;
