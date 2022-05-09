import { gql } from "@apollo/client";

export const VOTE_MUTATION = gql`
  mutation Vote($id: String!) {
    vote(id: $id)
  }
`;
