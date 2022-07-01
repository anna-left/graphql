import { gql } from "apollo-server";

export default gql`
  type Band {
    id: ID!
    name: String
    origin: String
    # members: [Member]
    members: [Artist]
    website: String
    genres: [Genre]
  }

  extend type Query {
    bands: [Band!]!
    band(id: ID!): Band!
  }
`;
