import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IArtist } from "./artist.interface";

class ArtistAPI extends RESTDataSource {
  PORT = Number(process.env.ARTIST_PORT) || 3002;
  constructor() {
    super();
    // this.baseURL = "http://localhost:3002/v1/";
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getArtists() {
    const data = await this.get("artists");
    return data.items.map((item: IArtist) => ({ ...item, id: item._id }));
  }

  async getArtist(artistID: string) {
    const data = await this.get(`artists/${artistID}`);
    return { ...data, id: data._id };
  }
}

export { ArtistAPI };
