const {gql} = require('apollo-server');

const typeDefs = gql`
    input ItemInput {
        name: String!
        select: Int!
    }

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
        updateItems(items: [ItemInput]!): Boolean!
    }
`;

module.exports = typeDefs;
