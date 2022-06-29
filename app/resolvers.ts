// import { RESTDataSource } from "apollo-datasource-rest";
// import { GenreAPI } from "./datasources/genre-api";
const resolvers = {
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
    user: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.userAPI.getUser(id);
    },
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

export { resolvers };
