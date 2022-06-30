import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String!
    email: String!
  }

  extend type Query {
    user(id: ID!): User!
  }
`;
