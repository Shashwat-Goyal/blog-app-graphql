import React from 'react';
import './App.scss';
import BlogList from './components/BlogList';
import ApolloClient from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
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
        <BlogList />
      </ApolloProvider>
    </div>
  );
}

export default App;
