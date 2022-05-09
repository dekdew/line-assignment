import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuthToken } from "./auth";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URI,
});

const authMiddleware = (authToken: any) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: authToken,
        },
      }));
    }

    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};
