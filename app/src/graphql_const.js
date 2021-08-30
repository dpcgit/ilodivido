//https://dgraph.io/blog/post/designing-graphql-schemas/
//https://www.apollographql.com/docs/react/data/queries/

import { gql } from '@apollo/client';

export const ADD_USER = gql`
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

export const GET_USERS = gql`
  query get_Users {
    users {
      username
    }
  }
`;


export const GET_USER = gql`
  query get_User($username: String!) {
    user (
      username: $username
    )
    {
      username
    }
  }
`;

export const GET_USER_CREDENTIALS = gql`
query get_user_credentials($username: String!) {
  user (
    username: $username
  )
  {
    username
    password
  }
}
`;