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
};

export { userResolver };
