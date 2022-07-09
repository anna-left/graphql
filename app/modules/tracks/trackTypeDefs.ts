import { gql } from "apollo-server";

export default gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  input TrackInput {
    id: ID!
    title: String!
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  input CreateTrackInput {
    title: String!
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  extend type Query {
    tracks(limit: Int, offset: Int): [Track]
    track(id: ID!): Track
  }

  type Mutation {
    createTrack(createTrackInput: CreateTrackInput): TrackResponse!
    updateTrack(updateTrackInput: TrackInput): TrackResponse!
    deleteTrack(id: ID!): deleteTrackResponse!
  }

  type TrackResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  type deleteTrackResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
