import { gql } from "apollo-server";

export default gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  input AlbumInput {
    id: ID!
    name: String
    released: Int
    artistsIds: [String]
    bandsIds: [String]
    trackIds: [String]
    genresIds: [String]
    image: String
  }

  input CreateAlbumInput {
    name: String
    released: Int
    artistsIds: [String]
    bandsIds: [String]
    trackIds: [String]
    genresIds: [String]
    image: String
  }

  extend type Query {
    albums(limit: Int, offset: Int): [Album]
    album(id: ID!): Album
  }

  type Mutation {
    createAlbum(createAlbumInput: CreateAlbumInput): albumResponse!
    updateAlbum(updateAlbumInput: AlbumInput): albumResponse!
    deleteAlbum(id: ID!): deleteAlbumResponse!
  }

  type albumResponse {
    code: Int!
    success: Boolean!
    message: String!
    album: Album
  }

  type deleteAlbumResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
