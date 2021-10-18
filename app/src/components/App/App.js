import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setRegistered } from './AppSlice'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateWrapper from '../PrivateWrapper/PrivateWrapper';
import Login from '../Login/Login';
import Register from '../Register/Register';


function App() {

  // Logic to save login state to storage, it's a a pain having to log in every single time
  // https://typeofnan.dev/using-session-storage-in-react-with-hooks/
  function getStorageKey(key,defaultVal){
    const stored_key = localStorage.getItem(key);
    if(!stored_key){
      return defaultVal;
    }
    console.log('stored key',JSON.parse(stored_key))
    return JSON.parse(stored_key);
  }



  const dispatch = useDispatch()
  //dispatch(setLoggedIn({logged_in:getStorageKey('loggedIn',false)}))
  const saved_login = getStorageKey('loggedIn',false)
  dispatch(setLoggedIn({logged_in:saved_login}));
  const loggedIn = useSelector((state)=>state.app.logged_in)
  console.log('Logged in? ',loggedIn)
  const registered = useSelector((state)=> state.app.registered)

  // effect that sets registered to false right after it's changed to true by the
  // submit handler in the register component, as without it we cannot visit register again
  // after registered is set to true: {registered ? <Redirect to="/login" />:<Register setRegistered={setRegistered}/>}

  useEffect(()=>{
    dispatch(setRegistered({registered:false}));
  });

  useEffect(()=>{
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn))
    console.log('ky stored by effect',getStorageKey('loggedIn',false))
  });
 //
  return (
      <div>
        <h1>Ilodivido</h1>
        <BrowserRouter>
        <Switch>
          <Route path="/login">
            {saved_login ? <Redirect to="/"/> :<Login/>}
          </Route>
          <Route path='/register'>
            {registered ? <Redirect to="/login" />:<Register/>}
          </Route>
          <Route path='/'>
            <PrivateWrapper/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );

}


export default App;
