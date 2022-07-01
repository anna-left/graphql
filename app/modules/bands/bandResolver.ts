import { IArtist } from "../artists/artist.interface";
import { IGenre } from "../genres/genre.interface";

const bandResolver = {
  Query: {
    bands: (_: string, __: string, { dataSources }: { dataSources: any }) => {
      return dataSources.bandAPI.getBands();
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
};

export { bandResolver };
