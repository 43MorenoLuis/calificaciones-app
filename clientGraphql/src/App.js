import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import AppRouter from './routers/AppRouter';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if( graphqlErrors ){
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`);
    });
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:9090/graphql'}),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function App() {
  return (
    <ApolloProvider client={ client }>
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  )
}

