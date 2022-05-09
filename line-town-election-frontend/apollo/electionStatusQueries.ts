import { gql } from "@apollo/client";

export const ELECTION_STATUS_QUERIES = gql`
  query {
    isOpen: open
  }
`;
