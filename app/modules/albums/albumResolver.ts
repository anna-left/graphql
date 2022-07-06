import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";
import { ITrack } from "../tracks/track.interface";
import { IAlbumUpdate } from "../albums/album.interface";
import { GLOBAL_VALUES } from "../../utils/constants";
import {
  reportAccessDenied,
  reportNotFound,
  reportRemoval,
  reportError,
} from "../../utils/reportAnswers";

const albumResolver = {
  Query: {
    albums: (
      _: string,
      { limit, offset }: { limit: number; offset: number },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.albumAPI.getAlbums(limit, offset);
    },
    album: (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      return dataSources.albumAPI.getAlbum(id);
    },
  },
  Album: {
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
    createAlbum: async (
      _: string,
      { createAlbumInput }: { createAlbumInput: IAlbumUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          album: null,
        };
      }
      try {
        console.log("createAlbum ---", createAlbumInput);
        const album = await dataSources.albumAPI.createAlbum(createAlbumInput);
        console.log("album ---", album);
        return {
          code: 200,
          success: true,
          message: `Successfully created album ${album.name}`,
          album,
        };
      } catch (err: any) {
        console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          album: null,
        };
      }
    },

    updateAlbum: async (
      _: string,
      { updateAlbumInput }: { updateAlbumInput: IAlbumUpdate },
      { dataSources }: { dataSources: any }
    ) => {
      console.log("albumInput ---", updateAlbumInput);
      if (!GLOBAL_VALUES.token) {
        return {
          code: 403,
          success: false,
          message: GLOBAL_VALUES.MESSAGE_ACCESS_DENIED,
          album: null,
        };
      }
      try {
        const album = await dataSources.albumAPI.updateAlbum(updateAlbumInput);
        console.log("answer API --- ", album);
        if (!album) {
          return {
            code: 404,
            success: false,
            message: "Not Found ",
            album: null,
          };
        }
        return {
          code: 200,
          success: true,
          message: `Successfully updated album ${album.name}`,
          album,
        };
      } catch (err: any) {
        // console.log("---err", err);
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          album: null,
        };
      }
    },
    deleteAlbum: async (
      _: string,
      { id }: { id: string },
      { dataSources }: { dataSources: any }
    ) => {
      if (!GLOBAL_VALUES.token) {
        return reportAccessDenied();
      }
      try {
        const answer = await dataSources.albumAPI.deleteAlbum(id);
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

export { albumResolver };
