import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

import { GenreAPI } from "./modules/genres/genreApi.service";
import { UserAPI } from "./modules/users/userApi.service";
import { BandAPI } from "./modules/bands/bandApi.service";

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
