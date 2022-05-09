import { gql } from "@apollo/client";

export const CANDIDATES_QUERIES = gql`
  query {
    candidates {
      id
      name
      dob
      policy
      bioLink
      imageURL
      votedCount
    }
  }
`;
