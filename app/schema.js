//https://dgraph.io/blog/post/designing-graphql-schemas/
//https://medium.com/swlh/populate-subdocument-in-graphql-4e7f9ede5a1c
//  https://www.apollographql.com/docs/apollo-server/schema/schema/
//https://graphql.org/graphql-js/mutations-and-input-types/
// https://www.apollographql.com/docs/apollo-server/data/file-uploads/
const { gql } = require('apollo-server-express')

const typeDefs = gql`
    
    type User {
        id: ID!
        username: String
        email: String
        password: String
        location: String
        tools: [Tool]
    }  

    type Tool{
        id: ID!
        name:String
        description:String
        power_tool:String
        hourly_price:String
        price:String
        pictures: [String]
        location: String
    }

    input UserInput {
        username: String
        email: String
        password: String
        location: String
        tools: String
    }

    input ToolInput {
        name:String
        description:String
        power_tool:String
        hourly_price:String
        price:String
        pictures:[String]
        location: String
    }

    type Query {
        users: [User]
        user(username: String!): User 
        tools: [Tool]
        tool (name: String!): [Tool]
        tools_by_user (user: String!): [Tool]
    }

    type Mutation {
        addUser (input: UserInput!): User    
        addTool (input: ToolInput!, username: String!): Tool
    }

`

module.exports = typeDefs;