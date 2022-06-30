import { gql } from "apollo-server";

export default gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  extend type Query {
    genres: [Genre!]!
    genre(id: ID!): Genre!
  }
`;
