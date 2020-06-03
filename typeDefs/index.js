const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');
const taskTypeDefs = require('./task');

const TypeDefs  = gql`
    scalar Date
    
    type Query{
        _ : String
    }
    type Mutation{
        _ : String
    }
`;

module.exports = [
    TypeDefs,
    userTypeDefs,
    taskTypeDefs
];