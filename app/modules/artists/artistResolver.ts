import { GLOBAL_VALUES } from "../../utils/constants";
import { IBand } from "../bands/band.interface";
import { IArtistUpdate } from "./artist.interface";

const artistResolver = {
  Query: {
    artists: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.artistAPI.getArtists(limit, offset);
    },
    artist: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.artistAPI.getArtist(id);
    },
  },

  Artist: {
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
  },

  Mutation: {
    createArtist: async (
      _: string,
      { createArtistInput }: { createArtistInput: IArtistUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          artist: null,
        };
      }
      try {
        console.log("createArtistInput ---", createArtistInput);
        const artist = await dataSources.artistAPI.createArtist(
          createArtistInput
        );
        // console.log("artist ---", artist);
        return {
          code: 200,
          success: true,
          message: `Successfully created artist ${artist.name}`,
          artist,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          artist: null,
        };
      }
    },
    updateArtist: async (
      _: string,
      { updateArtistInput }: { updateArtistInput: IArtistUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      console.log("artistInput ---", updateArtistInput);
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          artist: null,
        };
      }
      try {
        const artist = await dataSources.artistAPI.updateArtist(
          updateArtistInput
        );
        if (!artist) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            id: artist,
          };
        }
        return {
          code: 200,
          success: true,
          message: `Successfully updated artist ${artist.name}`,
          artist,
        };
      } catch (err: any) {
        // console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          artist: null,
        };
      }
    },
    deleteArtist: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          id: "",
        };
      }
      try {
        const answer = await dataSources.artistAPI.deleteArtist(id);
        // console.log("answer ---", answer);
        if (!answer || !answer.deletedCount) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            id,
          };
        }
        return {
          code: 200,
          success: true,
          message: `Successfully deleted artist ${id}`,
          id,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          id: "",
        };
      }
    },
  },
};

export { artistResolver };
