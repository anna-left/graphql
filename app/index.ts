import { ApolloServer } from "apollo-server";
import merge from "lodash/merge";

// import { baseTypeDefs } from "./schema";
import { bandResolver } from "./modules/bands/bandResolver";
import { genreResolver } from "./modules/genres/genreResolver";
import { userResolver } from "./modules/users/userResolver";
import { artistResolver } from "./modules/artists/artistResolver";
import { trackResolver } from "./modules/tracks/trackResolver";

import { GenreAPI } from "./modules/genres/genreApi.service";
import { UserAPI } from "./modules/users/userApi.service";
import { BandAPI } from "./modules/bands/bandApi.service";
import { ArtistAPI } from "./modules/artists/artistApi.service";
import { TrackAPI } from "./modules/tracks/trackApi.service";

import genreTypeDefs from "./modules/genres/genreTypeDefs";
import userTypeDefs from "./modules/users/userTypeDefs";
import bandTypeDefs from "./modules/bands/bandTypeDefs";
import artistTypeDefs from "./modules/artists/artistTypeDefs";
import trackTypeDefs from "./modules/tracks/trackTypeDefs";

const server = new ApolloServer({
  typeDefs: [
    genreTypeDefs,
    userTypeDefs,
    bandTypeDefs,
    artistTypeDefs,
    trackTypeDefs,
  ],
  resolvers: merge(
    bandResolver,
    genreResolver,
    userResolver,
    artistResolver,
    trackResolver
  ),
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
      userAPI: new UserAPI(),
      bandAPI: new BandAPI(),
      artistAPI: new ArtistAPI(),
      trackAPI: new TrackAPI(),
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
