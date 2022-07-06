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
    favourites(limit: Int, offset: Int): [Favourite]
    favourite(id: ID!): Favourite
  }

  type Mutation {
    addTrackToFavourites(id: ID!): FavouriteResponse
    addBandToFavourites(id: ID!): FavouriteResponse
    addArtistToFavourites(id: ID!): FavouriteResponse
    addGenreToFavourites(id: ID!): FavouriteResponse
  }

  type FavouriteResponse {
    code: Int!
    success: Boolean!
    message: String!
    favourite: Favourite
  }
`;
