import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    genres: [Genre!]!
    genre(id: ID!): Genre!
    user(id: ID!): User!
    bands: [Band!]!
    band(id: ID!): Band!
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String!
    email: String!
  }

  type Band {
    id: ID!
    name: String
    origin: String
    # members: [Member]
    website: String
    genres: String
  }
`;

export { typeDefs };
