import { gql } from "apollo-server";

export default gql`
  type Band {
    id: ID!
    name: String
    origin: String
    # members: [Member]
    members: [Artist]
    website: String
    genres: [Genre]
  }
  # input BandInput {
  #   id: ID!
  #   name: String
  #   origin: String
  #   # members: [Member]
  #   members: [Artist]
  #   website: String
  #   genres: [Genre]
  # }

  extend type Query {
    bands(limit: Int, offset: Int): [Band!]!
    band(id: ID!): Band!
  }

  type Mutation {
    # createBand(
    #   name: String
    #   origin: String
    #   # members: [Member]
    #   members: [Artist]
    #   website: String # genres: [Genre]
    # ): createBandResponse!

    # updateBand(
    #   id: ID!
    #   name: String
    #   origin: String
    #   # members: [Member]
    #   members: [Artist]
    #   website: String
    #   genres: [Genre]
    # ): updateBandResponse!

    deleteBand(id: ID!): deleteBandResponse!
  }

  # type createBandResponse {
  #   code: Int!
  #   success: Boolean!
  #   message: String!
  #   band: Band
  # }

  # type updateBandResponse {
  #   code: Int!
  #   success: Boolean!
  #   message: String!
  #   band: Band
  # }

  type deleteBandResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: String
  }
`;
