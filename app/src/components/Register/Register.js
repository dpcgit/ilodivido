import { useMutation} from '@apollo/client';
import React, {useState} from 'react';
import { ADD_USER} from '../../graphql_const';
import { Link } from 'react-router-dom';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// https://www.apollographql.com/docs/react/data/mutations/
//https://www.apollographql.com/docs/react/get-started/
//https://medium.com/nerd-for-tech/how-to-build-forms-with-multiple-input-fields-using-react-hooks-677da2b851aa
// https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server


export default function Register({setRegistered}) {

  const [user,setUser] = useState({username:"",email:"",password:"", location:''});
  
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
   
  async function handleSubmit(event){
    event.preventDefault();
    addUser({variables:{addUserInput:user}})
    setRegistered(true);
    console.log('user registered')
  };

  function handleChange(event){
    setUser({...user,[event.target.name]:event.target.value});
  };

  return(
    <div className="register-wrapper">
        <h1>Create your account</h1>
        <form onSubmit={e=>handleSubmit(e)}>
            <label>
                <p>Username</p>
                <input type="text" name="username" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="password" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="email" name="email" onChange={e=>handleChange(e)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            <Link to='/login'>
                <button>Login</button>
            </Link>
        </form>
        
    </div>
  )
}
