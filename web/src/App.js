import {
    ApolloClient,
    ApolloLink,
    concat,
    HttpLink,
    InMemoryCache,
} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingBasket from "./pages/shoppingBasket";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache,
});

function App() {
  return (
      <ApolloProvider client={client}>
          <ShoppingBasket />
      </ApolloProvider>
  );
}

export default App;
