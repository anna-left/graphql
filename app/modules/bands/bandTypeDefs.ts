import { gql } from "apollo-server";

export default gql`
  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {
    artist: String
    instrument: String
    years: String
  }

  input MemberInput {
    artist: String
    instrument: String
    years: String
  }

  input BandInput {
    id: ID!
    name: String
    origin: String
    members: [MemberInput]
    website: String
    genresIds: [String]
  }

  input CreateBandInput {
    name: String
    origin: String
    members: [MemberInput]
    website: String
    genres: [GenreInput]
  }

  extend type Query {
    bands(limit: Int, offset: Int): [Band!]!
    band(id: ID!): Band!
  }

  type Mutation {
    createBand(createBandInput: CreateBandInput): BandResponse!
    updateBand(updateBandInput: BandInput): BandResponse!
    deleteBand(id: ID!): deleteBandResponse!
  }

  type BandResponse {
    code: Int!
    success: Boolean!
    message: String!
    band: Band
  }

  type deleteBandResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
