import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { ITrack } from "../tracks/track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

const favouriteResolver = {
  Query: {
    favourites: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      console.log("---GLOBAL_VALUES.token --- ", GLOBAL_VALUES.token);
      if (!GLOBAL_VALUES.token) {
        return {
          id: "Access denied for unauthorized users",
          userId: "Access denied for unauthorized users",
        };
      }
      console.log("---resolver");
      return dataSources.favouriteAPI.getFavourites();
      console.log(limit, offset);
    },
  },
  Favourite: {
    genres: (
      { genresIds }: { genresIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!genresIds.length) {
        return;
      }
      const arrPromises: IGenre[] = [];
      console.log("--- genresIds ---", genresIds);
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
      if (!bandsIds.length) {
        return;
      }
      const arrPromises: IBand[] = [];
      console.log("--- bandsIds ---", bandsIds);
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
      if (!tracksIds.length) {
        return;
      }
      const arrPromises: ITrack[] = [];
      console.log("--- tracksIds ---", tracksIds);
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
      if (!artistsIds.length) {
        return;
      }
      const arrPromises: ITrack[] = [];
      console.log("--- artistsIds ---", artistsIds);
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
        const genre = await dataSources.genreAPI.getGenre(id);
        console.log("--- genre ---", genre);
        if (!genre) {
          return {
            code: 404,
            success: false,
            message: `Not Found genre with ID ${id}`,
            favourite: null,
          };
        }
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
        const track = await dataSources.trackAPI.getTrack(id);
        console.log("--- track ---", track);
        if (!track) {
          return {
            code: 404,
            success: false,
            message: `Not Found track with ID ${id}`,
            favourite: null,
          };
        }
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
        const band = await dataSources.bandAPI.getBand(id);
        console.log("--- band ---", band);
        if (!band) {
          return {
            code: 404,
            success: false,
            message: `Not Found band with ID ${id}`,
            favourite: null,
          };
        }

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
        const artist = await dataSources.artistAPI.getArtist(id);
        console.log("--- artist ---", artist);
        if (!artist) {
          return {
            code: 404,
            success: false,
            message: `Not Found artist with ID ${id}`,
            favourite: null,
          };
        }
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
