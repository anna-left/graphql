// import { RESTDataSource } from "apollo-datasource-rest";
// import { GenreAPI } from "./datasources/genre-api";
const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    genres: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.genreAPI.getGenres();
    },
    // genres: (
    //   _: string,
    //   __: string,
    //   {
    //     dataSources,
    //   }: { dataSources: Record<string, Record<string, typeof GenreAPI>> }
    // ) => {
    //   return dataSources.genreAPI.getGenres();
    // },

    // get a single track by ID, for the track page
    genre: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.genreAPI.getGenre(id);
    },
  },
};

export { resolvers };
