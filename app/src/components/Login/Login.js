//https://dgraph.io/blog/post/designing-graphql-schemas/
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button} from 'antd'
import { setUser,setLoggedIn } from '../App/AppSlice'
import { useQuery} from '@apollo/client';
import { GET_USER_CREDENTIALS} from '../../graphql_const';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';


export default function Login() {

  const [user_info,setUserinfo] = useState({username:"",password:""});
  const dispatch = useDispatch();
  const {data, loading, error} = useQuery(GET_USER_CREDENTIALS,{variables:{username:user_info.username}});

  function handleChange(event){
    setUserinfo({...user_info,[event.target.name]:event.target.value});
  };

  async function handleSubmit(event){
    event.preventDefault();
   try {

    if(data.user.username === user_info.username && data.user.password === user_info.password){
      dispatch(setUser({username:data.user.username}))
      dispatch(setLoggedIn({logged_in:true}))
      localStorage.setItem('loggedIn',JSON.stringify(true))
      console.log('logged in')
    }
    else{
      dispatch(setLoggedIn({logged_in:false}))
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
        <Form onSubmit={e=>handleSubmit(e)} layout='horizontal'>
            <label>
                <p>Username</p>
                <Input type="text" name="username" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Password</p>
                <Input type="password" name="password" onChange={e=>handleChange(e)}/>
            </label>
            <div>
                <Button type="submit" onClick={e=>handleSubmit(e)}>Submit</Button>
            </div>
              <Link to='/register'>
                <Button>Register</Button>
              </Link>
        </Form>
    </div>
  )
}
