import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { ITrackInput } from "../tracks/track.interface";

const trackResolver = {
  Query: {
    tracks: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.trackAPI.getTracks(limit, offset);
    },
    track: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  Track: {
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
  },
  Mutation: {
    createTrack: async (
      _: string,
      { trackInput }: { trackInput: ITrackInput },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        console.log("newTrack ---", trackInput);
        const track = await dataSources.trackAPI.createTrack(trackInput);
        console.log("track ---", track);
        return {
          code: 200,
          success: true,
          message: `Successfully registered track ${track.name}`,
          track,
        };
      } catch (err: any) {
        console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
    updateTrack: async (
      _: string,
      {
        id,
        name,
        description,
        country,
        year,
      }: {
        id: string;
        name: string;
        description: string;
        country: string;
        year: number;
      },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        const newTrack = { name, description, country, year };
        // console.log("newTrack ---", newTrack);
        // const track = await dataSources.trackAPI.updateTrack(id, newTrack);
        // console.log("track ---", track);
        const track = await dataSources.trackAPI.updateTrack(id, newTrack);
        // console.log("answer ---", answer);
        if (!track) {
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
          message: `Successfully registered track ${track.name}`,
          track,
        };
      } catch (err: any) {
        // console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
    deleteTrack: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      try {
        const answer = await dataSources.trackAPI.deleteTrack(id);
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
          message: `Successfully deleted track ${id}`,
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

export { trackResolver };
