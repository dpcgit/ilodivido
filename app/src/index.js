import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
//import { createUploadLink } from 'apollo-upload-client';

/*
const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true"
  }
})
*/

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
  //link: uploadLink
});



ReactDOM.render(
<ApolloProvider client={client}>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
