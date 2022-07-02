import "dotenv/config";
// import { ApolloServer, AuthenticationError } from "apollo-server";
import { ApolloServer } from "apollo-server";
import merge from "lodash/merge";
// import axios from "axios";

import { bandResolver } from "./modules/bands/bandResolver";
import { genreResolver } from "./modules/genres/genreResolver";
import { userResolver } from "./modules/users/userResolver";
import { artistResolver } from "./modules/artists/artistResolver";
import { trackResolver } from "./modules/tracks/trackResolver";
import { albumResolver } from "./modules/albums/albumResolver";
import { favouriteResolver } from "./modules/favourites/favouriteResolver";

import { GenreAPI } from "./modules/genres/genreApi.service";
import { UserAPI } from "./modules/users/userApi.service";
import { BandAPI } from "./modules/bands/bandApi.service";
import { ArtistAPI } from "./modules/artists/artistApi.service";
import { TrackAPI } from "./modules/tracks/trackApi.service";
import { AlbumAPI } from "./modules/albums/albumApi.service";
import { FavouriteAPI } from "./modules/favourites/favouriteApi.service";

import genreTypeDefs from "./modules/genres/genreTypeDefs";
import userTypeDefs from "./modules/users/userTypeDefs";
import bandTypeDefs from "./modules/bands/bandTypeDefs";
import artistTypeDefs from "./modules/artists/artistTypeDefs";
import trackTypeDefs from "./modules/tracks/trackTypeDefs";
import albumTypeDefs from "./modules/albums/albumTypeDefs";
import favouriteTypeDefs from "./modules/favourites/favouriteTypeDefs";

const server = new ApolloServer({
  typeDefs: [
    genreTypeDefs,
    userTypeDefs,
    bandTypeDefs,
    artistTypeDefs,
    trackTypeDefs,
    albumTypeDefs,
    favouriteTypeDefs,
  ],
  resolvers: merge(
    bandResolver,
    genreResolver,
    userResolver,
    artistResolver,
    trackResolver,
    albumResolver,
    favouriteResolver
  ),
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
      userAPI: new UserAPI(),
      bandAPI: new BandAPI(),
      artistAPI: new ArtistAPI(),
      trackAPI: new TrackAPI(),
      albumAPI: new AlbumAPI(),
      favouriteAPI: new FavouriteAPI(),
    };
  },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const userId = token.split(" ")[1]; // get the user name after 'Bearer '
    return;
    console.log("token-------", token);

    console.log("userId-------", userId);
    // if (userId) {
    //   const PORT = Number(process.env.USER_PORT) || 3004;
    //   const { data } = await axios
    //     .get(`http://localhost:${PORT}/login/${userId}`)
    //     .catch((error) => {
    //       console.log("-----error", error);
    //       // throw new AuthenticationError(error.message);
    //     });
    //   console.log("---data", data);
    //   console.log("---data", data.id);
    //   console.log("---data", data.role);
    //   return { userId: data.id, userRole: data.role };
    // }
  },
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
