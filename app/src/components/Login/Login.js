//https://dgraph.io/blog/post/designing-graphql-schemas/
import React, {useState} from 'react';
import { useQuery} from '@apollo/client';
import { GET_USER_CREDENTIALS} from '../../graphql_const';
import { Link } from 'react-router-dom';

export default function Login({setLoggedin,setusername}) {

  const [user,setUser] = useState({username:"",password:""});
  
  const {data, loading, error} = useQuery(GET_USER_CREDENTIALS,{variables:{username:user.username}});

  function handleChange(event){
    setUser({...user,[event.target.name]:event.target.value});
  };

  async function handleSubmit(event){
    event.preventDefault();
   
   try {
     
    if(data.user.username == user.username && data.user.password == user.password){
      setLoggedin(true)
      setusername(data.user.username)
      console.log('logged in')
    }
    else{
      setLoggedin(false)
      console.log('error validating credentials')
    }
   }
   catch(error){
     console.log(error);
    console.log('something went wrong')
   }
  };

  return(
    <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={e=>handleSubmit(e)}>
            <label>
                <p>Username</p>
                <input type="text" name="username" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="password" onChange={e=>handleChange(e)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
              <Link to='/register'>
                <button>Register</button>
              </Link>
        </form>        
    </div>
  )
}
