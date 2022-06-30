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
    favourites: [Favourite!]!
    favourite(id: ID!): Favourite!
  }
`;
