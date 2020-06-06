import React from 'react';
import './App.scss';
import BlogList from './components/BlogList/BlogList';
import BlogPage from './components/BlogPage/BlogPage';
import CreateBlog from './components/CreateBlog/CreateBlog';
import ApolloClient from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const link = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={BlogList} />
            <Route path="/blogs/:id" component={BlogPage} />
            <Route path="/blog/create" component={CreateBlog} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
