const {gql} = require('apollo-server');

const typeDefs = gql`
    type Item {
        name: String!
        price: Int!
        imgUrl: String!
        select: Int!
    }
    type Query {
        getItems: [Item]!
    }
    type Mutation {
        postMutation(selected: [Int!]!): Boolean!
    }
`;

module.exports = typeDefs;
