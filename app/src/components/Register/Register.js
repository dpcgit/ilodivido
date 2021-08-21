import React from 'react';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';



export default function Register() {
  
  return(
    <div className="register-wrapper">
        <h1>Create your account</h1>
        <form onSubmit={console.log('tehe')}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => console.log(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => console.log(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="email" onChange={e => console.log(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}
