import { GLOBAL_VALUES } from "../../utils/constants";
import {
  reportAccessDenied,
  reportNotFound,
  reportRemoval,
} from "../../utils/reportAnswers";
import { IArtist } from "../artists/artist.interface";
// import { IArtist } from "../artists/artist.interface";
import { IGenre } from "../genres/genre.interface";
import { IBand, IBandUpdate } from "./band.interface";

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
      if (!genresIds) {
        return;
      }
      const arrPromises: IGenre[] = [];
      for (let i = 0; i < genresIds.length; i++) {
        arrPromises.push(dataSources.genreAPI.getGenre(genresIds[i]));
      }
      return Promise.all(arrPromises);
    },
    members: async (
      parent: IBand,
      __: string,
      { dataSources }: { dataSources: any }
    ) =>
      // { dataSources }: { dataSources: any }
      {
        // const arrMembers = [];
        if (!parent.members) {
          return;
        }
        console.log("parent.members --- ", parent.members);
        // return parent.members;
        const arrPromises: IArtist[] = [];
        for (let i = 0; i < parent.members.length; i++) {
          console.log("parent.members[i]._id --- ", parent.members[i].artist);
          arrPromises.push(
            dataSources.artistAPI.getArtist(parent.members[i].artist)
          );
        }
        const artists = await Promise.all(arrPromises);
        console.log(artists);
        const bandMemers = [];
        for (let i = 0; i < parent.members.length; i++) {
          bandMemers.push({
            artist: artists[i],
            instrument: parent.members[i].instrument,
            years: parent.members[i].years,
          });
        }
        return bandMemers;
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
            band: null,
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
        return reportAccessDenied();
      }
      try {
        const answer = await dataSources.bandAPI.deleteBand(id);
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

export { bandResolver };
