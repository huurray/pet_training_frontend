import {gql} from 'apollo-boost';

export const SEE_POST = gql`
  query SeePost($petType: String!, $pageNumber: Int!, $items: Int!) {
    SeePost(petType: $petType, pageNumber: $pageNumber, items: $items) {
      ok
      error
      result {
        id
        title
        text
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($petType: String, $title: String!, $text: String!) {
    CreatePost(petType: $petType, title: $title, text: $text) {
      ok
      error
    }
  }
`;
