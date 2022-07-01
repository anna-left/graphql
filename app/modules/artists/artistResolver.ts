import { IBand } from "../bands/band.interface";

const artistResolver = {
  Query: {
    artists: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.artistAPI.getArtists();
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
};

export { artistResolver };
