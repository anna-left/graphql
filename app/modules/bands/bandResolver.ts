import { GLOBAL_VALUES } from "../../utils/constants";
import { reportRemoval } from "../../utils/reportAnswers";
import { IArtist } from "../artists/artist.interface";
import { IGenre } from "../genres/genre.interface";
import { IBandUpdate } from "./band.interface";

const bandResolver = {
  Query: {
    bands: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.bandAPI.getBands(limit, offset);
    },
    band: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.bandAPI.getBand(id);
    },
  },
  Band: {
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
    members: (
      { membersId }: { membersId: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      const arrPromises: IArtist[] = [];
      for (let i = 0; i < membersId.length; i++) {
        arrPromises.push(dataSources.artistAPI.getArtist(membersId[i]));
      }
      return Promise.all(arrPromises);
    },
  },
  Mutation: {
    createBand: async (
      _: string,
      {
        createBandInput,
      }: {
        createBandInput: IBandUpdate;
      },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          band: null,
        };
      }
      try {
        console.log("createBandInput ---", createBandInput);
        const band = await dataSources.bandAPI.createBand(createBandInput);
        // console.log("band ---", band);
        return {
          code: 200,
          success: true,
          message: `Successfully created band ${band.name}`,
          band,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          band: null,
        };
      }
    },
    updateBand: async (
      _: string,
      { updateBandInput }: { updateBandInput: IBandUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      console.log("bandInput ---", updateBandInput);
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          band: null,
        };
      }
      try {
        const band = await dataSources.bandAPI.updateBand(updateBandInput);
        if (!band) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            id: band,
          };
        }
        return {
          code: 200,
          success: true,
          message: `Successfully updated band ${band.name}`,
          band,
        };
      } catch (err: any) {
        // console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          band: null,
        };
      }
    },
    deleteBand: async (
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
        const answer = await dataSources.bandAPI.deleteBand(id);
        // console.log("answer ---", answer);
        if (!answer || !answer.deletedCount) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            id,
          };
        }
        return reportRemoval(id);
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

export { bandResolver };
