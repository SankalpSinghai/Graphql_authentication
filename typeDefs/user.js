const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        users : [User!]
        user(id : ID!) : User 
    }   

    type User {
        id : ID!
        name : String!
        email : String!
        task : [Task!]
        createdAt : Date!
        updatedAt : Date!
    }

    extend type Mutation{
        signup (input : signupInput) : User
        login (input : loginInput ) : Token
    }

    input loginInput {
        email : String!
        password : String!
    }

    type Token  {
        token : String!
    }
    input signupInput {
        name  : String!
        email : String!
        password : String!
    }

   
`;