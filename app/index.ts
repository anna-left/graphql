import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

import { GenreAPI } from "./modules/genres/genre-api";
import { UserAPI } from "./modules/users/user-api";
import { BandAPI } from "./modules/bands/band-api";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
      userAPI: new UserAPI(),
      bandAPI: new BandAPI(),
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
