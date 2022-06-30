import { gql } from "apollo-server";

export default gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: String
  }

  extend type Query {
    artists: [Artist!]!
    artist(id: ID!): Artist!
  }
`;
