const bandResolver = {
  Query: {
    bands: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.bandAPI.getBands();
    },
    band: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.bandAPI.getBand(id);
    },
  },
};

export { bandResolver };
