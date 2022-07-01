import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IArtist } from "./artist.interface";

class ArtistAPI extends RESTDataSource {
  PORT = Number(process.env.ARTIST_PORT) || 3002;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getArtists() {
    const data = await this.get("artists");
    return data.items.map((item: IArtist) => ({
      ...item,
      id: item._id,
      instruments: item.instruments.join(" "),
    }));
  }

  async getArtist(artistID: string) {
    const data = await this.get(`artists/${artistID}`);
    if (!data) {
      console.log(`artist ID ${artistID} isn't correct`);
      return;
    }
    return { ...data, id: data._id };
  }
}

export { ArtistAPI };
