const artistResolver = {
  Query: {
    artists: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.artistAPI.getArtists();
    },
    artist: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.artistAPI.getArtist(id);
    },
  },
};

export { artistResolver };
