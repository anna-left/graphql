import { checkDateValidity } from "../../utils/checkDateValidity";
import { GLOBAL_VALUES } from "../../utils/constants";
import {
  reportAccessDenied,
  reportNotFound,
  reportRemoval,
  reportError,
} from "../../utils/reportAnswers";
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
      // const str = createArtistInput.birthDate;
      // const re = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
      // const found = str.match(re);
      // if (!found || found.length !== 1) {
      //   return {
      //     code: 400,
      //     success: false,
      //     message: "Date is not valid",
      //     artist: null,
      //   };
      // }
      // console.log("--- found ---", found);

      try {
        const answerDateValidity = checkDateValidity(
          createArtistInput.birthDate
        );
        if (answerDateValidity) {
          return answerDateValidity;
        }
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
        const answerDateValidity = checkDateValidity(
          updateArtistInput.birthDate
        );
        if (answerDateValidity) {
          return answerDateValidity;
        }
        const artist = await dataSources.artistAPI.updateArtist(
          updateArtistInput
        );
        if (!artist) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            artist: null,
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
        return reportAccessDenied();
      }
      try {
        const answer = await dataSources.artistAPI.deleteArtist(id);
        // console.log("answer ---", answer);
        if (!answer || !answer.deletedCount) {
          return reportNotFound(id);
        }
        return reportRemoval(id);
      } catch (err: any) {
        return reportError(err);
      }
    },
  },
};

export { artistResolver };
