import React from 'react';

export default function Login() {
  
  return(
    <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={console.log('tehe')}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => console.log(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => console.log(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}
