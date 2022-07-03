const genreResolver = {
  Query: {
    genres: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.genreAPI.getGenres(limit, offset);
    },
    genre: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.genreAPI.getGenre(id);
    },
  },
  Mutation: {
    createGenre: async (
      _: string,
      {
        name,
        description,
        country,
        year,
      }: {
        name: string;
        description: string;
        country: string;
        year: number;
      },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        const newGenre = { name, description, country, year };
        console.log("newGenre ---", newGenre);
        const genre = await dataSources.genreAPI.createGenre(newGenre);
        console.log("genre ---", genre);
        return {
          code: 200,
          success: true,
          message: `Successfully registered genre ${genre.name}`,
          genre,
        };
      } catch (err: any) {
        console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          genre: null,
        };
      }
    },
  },
};

export { genreResolver };
