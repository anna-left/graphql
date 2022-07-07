import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { IArtist } from "../artists/artist.interface";
import { ITrackUpdate } from "../tracks/track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";
// import { IAlbum } from "../albums/album.interface";
import {
  reportAccessDenied,
  reportNotFound,
  reportRemoval,
  reportError,
} from "../../utils/reportAnswers";

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
      if (!genresIds) {
        return;
      }
      const arrPromises: IGenre[] = [];
      for (let i = 0; i < genresIds.length; i++) {
        arrPromises.push(dataSources.genreAPI.getGenre(genresIds[i]));
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
      const arrPromises: IArtist[] = [];
      for (let i = 0; i < artistsIds.length; i++) {
        arrPromises.push(dataSources.artistAPI.getArtist(artistsIds[i]));
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
      for (let i = 0; i < bandsIds.length; i++) {
        arrPromises.push(dataSources.bandAPI.getBand(bandsIds[i]));
      }
      return Promise.all(arrPromises);
    },
    album: async (
      { albumId }: { albumId: string },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      if (!albumId) {
        return;
      }
      const album = await dataSources.albumAPI.getAlbum(albumId);
      console.log("--- album ---", album);
      return album;
    },
  },
  Mutation: {
    createTrack: async (
      _: string,
      { createTrackInput }: { createTrackInput: ITrackUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          track: null,
        };
      }
      try {
        console.log("createTrackInput ---", createTrackInput);
        const track = await dataSources.trackAPI.createTrack(createTrackInput);
        // console.log("track ---", track);
        return {
          code: 200,
          success: true,
          message: `Successfully created track ${track.name}`,
          track,
        };
      } catch (err: any) {
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
      { updateTrackInput }: { updateTrackInput: ITrackUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      console.log("trackInput ---", updateTrackInput);
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          track: null,
        };
      }
      try {
        const track = await dataSources.trackAPI.updateTrack(updateTrackInput);
        if (!track) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            track: null,
          };
        }
        return {
          code: 200,
          success: true,
          message: `Successfully updated track ${track.name}`,
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
      if (!GLOBAL_VALUES.token) {
        return reportAccessDenied();
      }
      try {
        const answer = await dataSources.trackAPI.deleteTrack(id);
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

export { trackResolver };
