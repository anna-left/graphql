const genreResolver = {
  Query: {
    genres: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.genreAPI.getGenres();
    },
    genre: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.genreAPI.getGenre(id);
    },
  },
};

export { genreResolver };
