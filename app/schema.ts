import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    genres: [Genre!]!
    genre: Genre!
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
`;

export { typeDefs };
