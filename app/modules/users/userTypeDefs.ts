import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    password: String!
    email: String!
  }

  type Query {
    user(id: ID!): User!
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      password: String!
      email: String!
    ): registerUserResponse!

    login(password: String!, email: String!): loginResponse!
  }

  type registerUserResponse {
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    user: User
  }

  type loginResponse {
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    jwt: String
  }
`;
