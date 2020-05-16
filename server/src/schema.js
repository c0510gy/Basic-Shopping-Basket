const {gql} = require('apollo-server');

const typeDefs = gql`
    type Item {
        name: String!
        price: Int!
        imgUrl: String!
        selected: Int!
    }
    type Query {
        getItems: [Item]!
    }
    type Mutation {
        updateSelected(selected: [Int!]!): Boolean!
    }
`;

module.exports = typeDefs;
