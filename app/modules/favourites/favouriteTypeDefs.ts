import { gql } from "apollo-server";

export default gql`
  type Favourite {
    id: ID!
    userId: ID!
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  extend type Query {
    favourites(limit: Int, offset: Int): [Favourite!]!
    favourite(id: ID!): Favourite!
  }
`;
