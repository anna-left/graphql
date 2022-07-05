import { gql } from "apollo-server";

export default gql`
  type Genre {
    id: ID!
    name: String!
    description: String
    country: String
    year: Int
  }

  input CreatGenreInput {
    name: String!
    description: String
    country: String
    year: Int
  }

  input UpdateGenreInput {
    id: ID!
    name: String
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
    ): GenreResponse!

    updateGenre(updateGenreInput: UpdateGenreInput): GenreResponse!

    deleteGenre(id: ID!): deleteGenreResponse!
  }

  type GenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    genre: Genre
  }

  # type updateGenreResponse {
  #   code: Int!
  #   success: Boolean!
  #   message: String!
  #   genre: Genre
  # }

  type deleteGenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
