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
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache,
});

function App() {
  return (
      <ApolloProvider client={client}>
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/" component={LoginPage}/>
                      <Route path="/signup" component={SignupPage}/>
                      <Route path="/main" component={ShoppingBasket}/>
                  </Switch>
              </div>
          </Router>
      </ApolloProvider>
  );
}

export default App;
