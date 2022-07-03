import { gql } from "apollo-server";

export default gql`
  type Track {
    id: ID!
    title: String!
    albums: [Album]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  input CreateTrackInput {
    title: String!
    albumsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  input UpdateTrackInput {
    id: ID!
    title: String!
    albumsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  extend type Query {
    tracks(limit: Int, offset: Int): [Track!]!
    track(id: ID!): Track!
  }

  type Mutation {
    createTrack(trackInput: CreateTrackInput): createTrackResponse!

    updateTrack(trackInput: UpdateTrackInput): updateTrackResponse!

    deleteTrack(id: ID!): deleteTrackResponse!
  }

  type createTrackResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  type updateTrackResponse {
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
