import React, {useState, useEffect} from 'react';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from 'styled-components';
import {ApolloClient} from 'apollo-client';
import options from './apollo';
import styles from './cStyles';
import AsyncStorage from '@react-native-community/async-storage';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink, Observable, split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import MainNavigation from './navigation/MainNavigation';
import {withClientState} from 'apollo-link-state';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      const request = async (operation: any) => {
        const token = await AsyncStorage.getItem('jwt');
        console.log(token);
        return operation.setContext({
          headers: {Authorization: `Bearer ${token}`},
        });
      };

      const requestLink = new ApolloLink(
        (operation, forward) =>
          new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
              .then((oper) => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(observer.error.bind(observer));
            return () => {
              if (handle) handle.unsubscribe();
            };
          }),
      );

      const httpLink = new HttpLink({
        uri: options.httpLink,
        credentials: 'include',
      });

      const wsLink = new WebSocketLink({
        uri: options.wsLink,
        options: {
          reconnect: true,
          lazy: true,
        },
      });
      const token = await AsyncStorage.getItem('jwt');
      const stateLink = withClientState({
        cache,
        defaults: {
          auth: {
            __typename: 'Auth',
            isLoggedIn: Boolean(token),
          },
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, {isConnected}, {cache}) => {
              const data = {
                networkStatus: {
                  __typename: 'NetworkStatus',
                  isConnected,
                },
              };
              cache.writeData({data});
              return null;
            },
            logUserIn: async (_, {token}, {cache}) => {
              await AsyncStorage.setItem('isLoggedIn', 'true');
              await AsyncStorage.setItem('jwt', token);
              console.log('??????');
              cache.writeData({
                data: {
                  __typename: 'Auth',
                  isLoggedIn: true,
                },
              });
              return null;
            },
            logUserOut: async (_, __, {cache}) => {
              await AsyncStorage.setItem('isLoggedIn', 'false');

              cache.writeData({
                data: {
                  __typename: 'Auth',
                  isLoggedIn: false,
                },
              });
              return null;
            },
          },
        },
      });

      const client = new ApolloClient({
        link: ApolloLink.from([
          onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
              console.log(graphQLErrors);
            }
            if (networkError) {
              console.log(networkError);
            }
          }),
          requestLink,
          split(
            // split based on operation type
            ({query}) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            wsLink,
            httpLink,
          ),
        ]),
        cache,
        resolvers: {
          Mutation: {
            logUserIn: async (_, {token}, {cache}) => {
              await AsyncStorage.setItem('isLoggedIn', 'true');
              await AsyncStorage.setItem('jwt', token);
              console.log('??????');
              cache.writeData({
                data: {
                  __typename: 'Auth',
                  isLoggedIn: true,
                },
              });
              return null;
            },
            logUserOut: async (_, __, {cache}) => {
              await AsyncStorage.setItem('isLoggedIn', 'false');
              await AsyncStorage.removeItem('jwt');
              const aa = await AsyncStorage.getItem('isLoggedIn');

              cache.writeData({
                data: {
                  __typename: 'Auth',
                  isLoggedIn: false,
                },
              });
              return null;
            },
          },
        },
      });
      client.writeData({
        data: {
          __typename: 'Auth',
          isLoggedIn: Boolean(token),
        },
      });
      setLoaded(true);
      setClient(client);
      setSplashFinish(true);
      // SplashScreen.hide();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && splashFinish ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <MainNavigation />
      </ThemeProvider>
    </ApolloProvider>
  ) : null;
};

export default App;
