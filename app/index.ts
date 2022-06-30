import { ApolloServer } from "apollo-server";
import merge from "lodash/merge";

// import { baseTypeDefs } from "./schema";
import { bandResolver } from "./modules/bands/bandResolver";
import { genreResolver } from "./modules/genres/genreResolver";
import { userResolver } from "./modules/users/userResolver";

import { GenreAPI } from "./modules/genres/genreApi.service";
import { UserAPI } from "./modules/users/userApi.service";
import { BandAPI } from "./modules/bands/bandApi.service";
import genreTypeDefs from "./modules/genres/genreTypeDefs";
import userTypeDefs from "./modules/users/userTypeDefs";
import bandTypeDefs from "./modules/bands/bandTypeDefs";

const server = new ApolloServer({
  typeDefs: [genreTypeDefs, userTypeDefs, bandTypeDefs],
  resolvers: merge(bandResolver, genreResolver, userResolver),
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
