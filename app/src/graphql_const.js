//https://dgraph.io/blog/post/designing-graphql-schemas/
//https://www.apollographql.com/docs/react/data/queries/

import { gql } from '@apollo/client';


export const ADD_USER = gql`
mutation AddUserMutation($addUserInput: UserInput!) {
  addUser(input: $addUserInput) {
    id
    username
    email
    password
    location
  }
}
`;

export const ADD_TOOL = gql`
mutation AddToolMutation($addToolInput: ToolInput!, $addToolUsername: String!) {
  addTool(input: $addToolInput, username: $addToolUsername) {
    name
    description
    power_tool
    hourly_price
    price
    pictures
    location
    id
  }
}  
`;


export const GET_USER_CREDENTIALS = gql`
query get_user_credentials($username: String!) {
  user (username: $username)
  {
    username
    password
  }
}
`;

