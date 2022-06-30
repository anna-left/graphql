import { gql } from "apollo-server";

export default gql`
  type Track {
    id: ID!
    title: String
    albums: String
    bands: [Band]
    duration: Int
    released: Int
    genresIds: [String]
  }

  extend type Query {
    tracks: [Track!]!
    track(id: ID!): Track!
  }
`;
