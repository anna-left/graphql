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
    jwt: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      if (!GLOBAL_VALUES.token) {
        return {
          id: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          email: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
        };
      }
      return dataSources.userAPI.getUserByToken();
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
        const user = await dataSources.userAPI.registerUser(newUser);
        return {
          code: 200,
          success: true,
          message: `Successfully registered user ${user.email}`,
          user,
        };
      } catch (err: any) {
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

        GLOBAL_VALUES.token = jwt;
        return {
          code: 200,
          success: true,
          message: `Successfully logged`,
          jwt,
        };
      } catch (err: any) {
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
