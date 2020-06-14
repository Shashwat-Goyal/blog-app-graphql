import React from 'react';
import './App.scss';
import BlogList from './components/BlogList/BlogList';
import BlogPage from './components/BlogPage/BlogPage';
import CreateBlog from './components/CreateBlog/CreateBlog';
import StepTracker from './components/StepTracker/StepTracker';
import ApolloClient from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withClientState } from 'apollo-link-state';
import { split, ApolloLink } from 'apollo-link';

import 'bootstrap/dist/css/bootstrap.min.css';

const cache = new InMemoryCache();

const clientStatelink = withClientState({
  cache,
  defaults: {
    toolName: "Widget Tool"
  },
  resolvers: {}
})

export const link = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([clientStatelink, link])
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
            <Route path="/step-tracker" component={StepTracker} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
