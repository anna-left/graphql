import { IArtist } from "../artists/artist.interface";
import { IGenre } from "../genres/genre.interface";

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
  // Mutation: {
  //   deleteBand: async (
  //     _: string,
  //     { id }: { id: string },
  //     { dataSources }: { dataSources: any }
  //   ) => {
  //     try {
  //       const answer = await dataSources.bandAPI.deleteBand(id);
  //       // console.log("answer ---", answer);
  //       if (!answer || !answer.deletedCount) {
  //         return {
  //           code: 404,
  //           success: false,
  //           message: "Not Found ",
  //           id,
  //         };
  //       }
  //       return {
  //         code: 200,
  //         success: true,
  //         message: `Successfully deleted band ${id}`,
  //         id,
  //       };
  //     } catch (err: any) {
  //       return {
  //         code: err.extensions.response.status,
  //         success: false,
  //         message: err.extensions.response.body,
  //         id: "",
  //       };
  //     }
  //   },
  // },
};

export { bandResolver };
