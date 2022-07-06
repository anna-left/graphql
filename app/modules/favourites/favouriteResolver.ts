import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { ITrack } from "../tracks/track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";
// import { IFavourite } from "./favourite.interface";

const favouriteResolver = {
  Query: {
    favourites: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return [
          {
            id: "Access denied for unauthorized users",
            userId: "Access denied for unauthorized users",
          },
        ];
      }
      console.log("---resolver");
      return dataSources.favouriteAPI.getFavourites(limit, offset);
    },
  },
  Favourite: {
    genres: (
      { genresIds }: { genresIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
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
      const arrPromises: IBand[] = [];
      for (let i = 0; i < bandsIds.length; i++) {
        arrPromises.push(dataSources.bandAPI.getBand(bandsIds[i]));
      }
      return Promise.all(arrPromises);
    },
    tracks: (
      { trackIds }: { trackIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      const arrPromises: ITrack[] = [];
      for (let i = 0; i < trackIds.length; i++) {
        arrPromises.push(dataSources.trackAPI.getTrack(trackIds[i]));
      }
      return Promise.all(arrPromises);
    },
    artists: (
      { artistsIds }: { artistsIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
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
      // console.log("dataUser --- ", userID);

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        // console.log("newFavourite ---", id);
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "genres",
          }
        );
        // console.log("favourite ---", favourite);
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        // console.log("---err", err);
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
      console.log("dataUser --- ", userID);

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        console.log("newFavourite ---", id);
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "tracks",
          }
        );
        console.log("favourite ---", favourite);
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        // console.log("---err", err);
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
      console.log("dataUser --- ", userID);

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        console.log("newFavourite ---", id);
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "bands",
          }
        );
        console.log("favourite ---", favourite);
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        // console.log("---err", err);
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
      console.log("dataUser --- ", userID);

      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          favourite: null,
        };
      }
      try {
        console.log("newFavourite ---", id);
        const favourite = await dataSources.favouriteAPI.addToFavourites(
          userID,
          {
            id,
            type: "artists",
          }
        );
        console.log("favourite ---", favourite);
        return {
          code: 200,
          success: true,
          message: `Successfully registered favourite ${id}`,
          favourite,
        };
      } catch (err: any) {
        // console.log("---err", err);
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
