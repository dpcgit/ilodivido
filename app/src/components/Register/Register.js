import React, {useState} from 'react';

//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// https://www.apollographql.com/docs/react/data/mutations/
//https://www.apollographql.com/docs/react/get-started/
//https://medium.com/nerd-for-tech/how-to-build-forms-with-multiple-input-fields-using-react-hooks-677da2b851aa
import { ApolloClient, gql, useMutation, InMemoryCache, ApolloProvider} from '@apollo/client';

// Define mutation
const ADD_USER = gql`
  mutation add_User($username: String!, $email: String!, $password: String!) {
    
    addUser(
        username: $username
        email: $email
        password: $password
        ) 
        
        {
        username
        email
        password
        }
  }
  
`;

export default function Register() {

  const [user,setUser] = useState({username:"",email:"",password:""});

  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
   
  function handleSubmit(event){
    event.preventDefault();
    addUser({variables:{username:user.username,email:user.email,password:user.password}});
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
        </form>
        
    </div>
  )
}
