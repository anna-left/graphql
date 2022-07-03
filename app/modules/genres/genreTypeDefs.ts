import { gql } from "apollo-server";

export default gql`
  type Genre {
    id: ID!
    name: String!
    description: String
    country: String
    year: Int
  }

  input GenreInput {
    id: ID!
    name: String!
    description: String
    country: String
    year: Int
  }

  extend type Query {
    genres(limit: Int, offset: Int): [Genre!]!
    genre(id: ID!): Genre!
  }

  type Mutation {
    createGenre(
      name: String!
      description: String
      country: String
      year: Int
    ): createGenreResponse!

    updateGenre(
      id: ID!
      name: String!
      description: String
      country: String
      year: Int
    ): updateGenreResponse!

    deleteGenre(id: ID!): deleteGenreResponse!
  }

  type createGenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    genre: Genre
  }

  type updateGenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    genre: Genre
  }

  type deleteGenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
