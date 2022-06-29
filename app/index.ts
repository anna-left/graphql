import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

import { GenreAPI } from "./datasources/genre-api";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
