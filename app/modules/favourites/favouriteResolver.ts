import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { ITrack } from "../tracks/track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

const favouriteResolver = {
  Query: {
    favourites: (
      _: string,
      __: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          id: "Access denied for unauthorized users",
          userId: "Access denied for unauthorized users",
        };
      }
      return dataSources.favouriteAPI.getFavourites();
    },
  },
  Favourite: {
    genres: (
      { genresIds }: { genresIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!genresIds) {
        return;
      }
      const arrPromises: IGenre[] = [];
      for (let i = 0; i < genresIds.length; i++) {
        arrPromises.push(dataSources.genreAPI.getGenre(genresIds[i]));
      }
      return Promise.all(arrPromises);
    },
    bands: (
      { bandsIds }: { bandsIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!bandsIds) {
        return;
      }
      const arrPromises: IBand[] = [];
      for (let i = 0; i < bandsIds.length; i++) {
        arrPromises.push(dataSources.bandAPI.getBand(bandsIds[i]));
      }
      return Promise.all(arrPromises);
    },
    tracks: (
      { tracksIds }: { tracksIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!tracksIds) {
        return;
      }
      const arrPromises: ITrack[] = [];
      for (let i = 0; i < tracksIds.length; i++) {
        arrPromises.push(dataSources.trackAPI.getTrack(tracksIds[i]));
      }
      return Promise.all(arrPromises);
    },
    artists: (
      { artistsIds }: { artistsIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!artistsIds) {
        return;
      }
      const arrPromises: ITrack[] = [];
      for (let i = 0; i < artistsIds.length; i++) {
        arrPromises.push(dataSources.artistAPI.getArtist(artistsIds[i]));
      }
      return Promise.all(arrPromises);
    },
  },
  Mutation: {
    // *** genre
    addGenreToFavourites: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      const userID = await dataSources.userAPI.getUserByToken()._id;

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        const genre = await dataSources.genreAPI.getGenre(id);
        if (!genre) {
          return {
            code: 404,
            success: false,
            message: `Not Found genre with ID ${id}`,
            favourite: null,
          };
        }
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "genres",
          }
        );
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          favourite: null,
        };
      }
    },
    // *** track
    addTrackToFavourites: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      const userID = await dataSources.userAPI.getUserByToken()._id;
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        const track = await dataSources.trackAPI.getTrack(id);
        if (!track) {
          return {
            code: 404,
            success: false,
            message: `Not Found track with ID ${id}`,
            favourite: null,
          };
        }
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "tracks",
          }
        );
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          favourite: null,
        };
      }
    },
    // *** band
    addBandToFavourites: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      const userID = await dataSources.userAPI.getUserByToken()._id;

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        const band = await dataSources.bandAPI.getBand(id);
        if (!band) {
          return {
            code: 404,
            success: false,
            message: `Not Found band with ID ${id}`,
            favourite: null,
          };
        }

        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "bands",
          }
        );
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          favourite: null,
        };
      }
    },
    // *** artist
    addArtistToFavourites: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      const userID = await dataSources.userAPI.getUserByToken()._id;

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        const artist = await dataSources.artistAPI.getArtist(id);
        if (!artist) {
          return {
            code: 404,
            success: false,
            message: `Not Found artist with ID ${id}`,
            favourite: null,
          };
        }
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "artists",
          }
        );
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          favourite: null,
        };
      }
    },
  },
};

export { favouriteResolver };
