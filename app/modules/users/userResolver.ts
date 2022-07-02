import { GLOBAL_VALUES } from "../../utils/constants";

const userResolver = {
  Query: {
    user: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.userAPI.getUser(id);
    },
  },
  Mutation: {
    registerUser: async (
      _: string,
      {
        firstName,
        lastName,
        password,
        email,
      }: {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
      },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        const newUser = { firstName, lastName, password, email };
        console.log("newUser ---", newUser);
        const user = await dataSources.userAPI.registerUser(newUser);
        console.log("user ---", user);
        return {
          code: 200,
          success: true,
          message: `Successfully registered user ${user.email}`,
          user,
        };
      } catch (err: any) {
        console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          user: null,
        };
      }
    },
    login: async (
      _: string,
      {
        password,
        email,
      }: {
        password: string;
        email: string;
      },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        const jwt = await dataSources.userAPI.login({ password, email });
        console.log("jwtResolver ---", jwt);

        GLOBAL_VALUES.token = jwt;
        console.log("GLOBAL_VALUES.token---", GLOBAL_VALUES.token);
        return {
          code: 200,
          success: true,
          message: `Successfully logged user ${jwt}`,
          jwt,
        };
      } catch (err: any) {
        console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          jwt: null,
        };
      }
    },
  },
};

export { userResolver };
