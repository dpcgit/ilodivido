//https://www.debuggr.io/react-update-unmounted-component/
//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Preferences from '../Preferences/Preferences';
import SignOut from '../SignOut/SignOut';
import AddTool from '../AddTool/AddTool'
import SearchTool from '../SearchTool/SearchTool'
import { setLoggedIn, setLocation } from '../App/AppSlice';

function PrivateWrapper() {
  //const [location, setLocation] = useState();
  const dispatch = useDispatch()
  const location = useSelector((state)=>state.app.location)
  const loggedIn = useSelector((state)=>state.app.logged_in)
  const username = useSelector((state)=>state.app.username)

  useEffect(()=>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        dispatch(setLocation({location:[pos.coords.latitude,pos.coords.longitude]}))
        //console.log('location in state: ',location)
      })
    }
    else{
      dispatch(setLocation({location:['']}))
    }

  },[location])

  if(!loggedIn){
    return <Redirect to ="/login"/>
  }
  return (
      <div>
        <BrowserRouter>
        Welcome {username}\b
        location {JSON.stringify(location)}
        <nav>
          <ul>
            <li><Link to="/signout" onClick={()=>{dispatch(setLoggedIn({logged_in:false}));localStorage.setItem('loggedIn',JSON.stringify(false))}}>Signout</Link></li>
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
          <Route path='/search-tool*'>
            <SearchTool user_name={username}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default PrivateWrapper;
