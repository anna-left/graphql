import { gql } from "apollo-server";

export default gql`
  type Album {
    id: ID
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  extend type Query {
    albums(limit: Int, offset: Int): [Album!]!
    album(id: ID!): Album!
  }
`;
