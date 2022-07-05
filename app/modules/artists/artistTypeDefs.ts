import { gql } from "apollo-server";

export default gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  input ArtistInput {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [String]
    instruments: [String]
  }

  input CreateArtistInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [String]
    instruments: [String]
  }

  extend type Query {
    artists(limit: Int, offset: Int): [Artist!]!
    artist(id: ID!): Artist!
  }

  type Mutation {
    createArtist(createArtistInput: CreateArtistInput): ArtistResponse!
    updateArtist(updateArtistInput: ArtistInput): ArtistResponse!
    deleteArtist(id: ID!): deleteArtistResponse!
  }

  type ArtistResponse {
    code: Int!
    success: Boolean!
    message: String!
    artist: Artist
  }

  type deleteArtistResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
