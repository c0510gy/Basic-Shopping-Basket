const {gql} = require('apollo-server');

const typeDefs = gql`
    type Item {
        name: String!
        price: Int!
        imgUrl: String!
        selected: Int!
    }
    type User {
        name: String!
        userID: String!
        password: String!
        token: String!
    }
    type Token {
        token: String!
    }
    type Query {
        getItems(token: String!): [Item]!
    }
    type Mutation {
        signup(name: String!, userID: String!, password: String!): Boolean!
        login(userID: String!, password: String!): String!
        logout(token: String!): Boolean!
        save(token: String!, selected: [Int]!): Boolean!
    }
`;

module.exports = typeDefs;
