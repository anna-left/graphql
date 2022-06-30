const albumResolver = {
  Query: {
    albums: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.albumAPI.getAlbums();
    },
    album: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.albumAPI.getAlbum(id);
    },
  },
};

export { albumResolver };
