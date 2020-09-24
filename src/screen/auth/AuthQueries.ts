import {gql} from 'apollo-boost';

export const SEE_IS_LOGGED_IN = gql`
  {
    auth @client {
      isLoggedIn
    }
  }
`;

export const IS_LOGGED_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const IS_LOGGED_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const JOIN_USER = gql`
  mutation JoinUser($id: String!, $avatar: String, $email: String) {
    JoinUser(id: $id, avatar: $avatar, email: $email) {
      ok
      error
      token
    }
  }
`;

export const CHECK_WHETHER_TO_JOIN = gql`
  query CheckWhetherToJoin($id: String!) {
    CheckWhetherToJoin(id: $id) {
      ok
      error
      result
    }
  }
`;
