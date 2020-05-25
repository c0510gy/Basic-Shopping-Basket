const {ApolloServer, gql, AuthenticationError, ForbiddenError} = require('apollo-server');
const {createStore} = require('./database');
const {createMockStore} = require('./mockDataWriter');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const {ItemAPI} = require('./dataSources/itemAPI');

const store = createStore(true);

const context = async ({ req }) => {
    await createMockStore(store);
};

const itemApi = new ItemAPI(store);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        itemAPI: itemApi,
    }),
    context,
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});
