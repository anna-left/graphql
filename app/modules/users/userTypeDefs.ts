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
    success: Boolean!
    message: String!
    user: User
  }

  type loginResponse {
    code: Int!
    success: Boolean!
    message: String!
    jwt: String
  }
`;
