import { gql } from "apollo-server";

export default gql`
  type Band {
    id: ID!
    name: String
    origin: String
    members: [Artist]
    website: String
    genres: String
  }

  extend type Query {
    bands: [Band!]!
    band(id: ID!): Band!
  }
`;
