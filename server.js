//https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server
//https://www.apollographql.com/docs/apollo-server/data/file-uploads/

const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
//const {  graphqlUploadExpress } = require('graphql-upload');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const mongoose = require('mongoose');

async function startApolloServer(){
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  //app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(resolve =>  app.listen({ port: 4000 }, resolve));
  
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  
  try {

    await mongoose.connect(`mongodb://127.0.0.1:27017/test`);
    console.log('MongoDB connected successfully');

    //mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
  } 
  catch (err) {
    console.error('Error while connecting to MongoDB');
  }
    
  return { server, app };

};

startApolloServer();

