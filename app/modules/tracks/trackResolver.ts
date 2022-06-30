const trackResolver = {
  Query: {
    tracks: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.trackAPI.getTracks();
    },
    track: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
};

export { trackResolver };
