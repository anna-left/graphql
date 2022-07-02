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
};

export { userResolver };
