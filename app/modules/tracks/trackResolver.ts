import { IBand } from "../bands/band.interface";
import { IGenre } from "../genres/genre.interface";

const trackResolver = {
  Query: {
    tracks: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.trackAPI.getTracks();
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
      const arrGenres: IGenre[] = [];
      for (let i = 0; i < genresIds.length; i++) {
        arrGenres.push(dataSources.genreAPI.getGenre(genresIds[i]));
      }
      return Promise.all(arrGenres);
    },
    bands: (
      { bandsIds }: { bandsIds: string[] },
      _: string,
      { dataSources }: { dataSources: any }
    ) => {
      const arrBands: IBand[] = [];
      console.log(bandsIds);
      for (let i = 0; i < bandsIds.length; i++) {
        console.log(bandsIds[i]);
        arrBands.push(dataSources.bandAPI.getBand(bandsIds[i]));
      }
      return Promise.all(arrBands);
    },
  },
};

export { trackResolver };
