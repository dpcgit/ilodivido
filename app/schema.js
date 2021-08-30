//https://dgraph.io/blog/post/designing-graphql-schemas/

const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        username: String!,
        email: String,
        password: String!
    }

    type Query {
        users: [User],
        user(username: String!): User 
    }

    type Mutation {
        addUser (username: String!, email: String!, password: String!): User    
    }
`

module.exports = typeDefs;