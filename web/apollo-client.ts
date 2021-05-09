import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `ws://chatpad-server.herokuapp.com/subscriptions`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: 'http://chatpad-server.herokuapp.com/graphql',
  credentials: 'same-origin',
});

const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink as any,
      httplink,
    )
  : httplink;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
