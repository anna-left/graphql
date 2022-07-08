import "dotenv/config";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { IArtist, IArtistInput, IArtistUpdate } from "./artist.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class ArtistAPI extends RESTDataSource {
  PORT = Number(process.env.ARTIST_PORT) || 3002;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getArtists(limit = 0, offset = 0) {
    const data = await this.get("artists", { limit, offset });
    return data.items.map((item: IArtist) => ({
      ...item,
      id: item._id,
    }));
  }

  async getArtist(artistID: string) {
    try {
      const data = await this.get(`artists/${artistID}`);
      if (!data) {
        console.log(`Could not find artist with ID ${artistID}`);
        return;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find artist with ID ${artistID}`);
      return;
    }
  }

  async createArtist(artist: IArtistInput) {
    console.log("createArtist artist --- ", artist);
    const data = await this.post("artists", artist);
    console.log("data --- ", data);
    return { ...data, id: data._id };
  }

  async updateArtist(artistData: IArtistUpdate) {
    console.log("updateArtist  artistData ---", artistData);
    let artist: any;
    try {
      artist = await this.getArtist(artistData.id);
    } catch (error) {
      return null;
    }
    console.log("updateArtist artist ---", artist);
    if (!artist) {
      console.log(`Could not find artist with ID ${artistData.id}`);
      return null;
    }

    const updArtist = {
      id: artistData.id,
      firstName: artistData.firstName || artist.firstName,
      secondName: artistData.secondName || artist.secondName,
      middleName: artistData.middleName || artist.middleName,
      birthDate: artistData.birthDate || artist.birthDate,
      birthPlace: artistData.birthPlace || artist.birthPlace,
      country: artistData.country || artist.country,
      bandsIds: artistData.bandsIds || artist.bandsIds,
      instruments: artistData.instruments || artist.instruments,
    };
    console.log("updArtist new --- ", updArtist);
    const data = await this.put(`artists/${artist.id}`, updArtist);
    return { ...data, id: data._id };
  }

  async deleteArtist(id: string) {
    const artist = await this.getArtist(id);
    if (!artist) {
      console.log(`Could not find artist with ID ${id}`);
      return null;
    }
    return await this.delete(`artists/${id}`);
  }
}

export { ArtistAPI };
