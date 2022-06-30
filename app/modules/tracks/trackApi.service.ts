import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { ITrack } from "./track.interface";

class TrackAPI extends RESTDataSource {
  PORT = Number(process.env.TRACK_PORT) || 3006;
  constructor() {
    super();
    // this.baseURL = "http://localhost:3006/v1/";
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getTracks() {
    const data = await this.get("tracks");
    return data.items.map((item: ITrack) => ({ ...item, id: item._id }));
  }

  async getTrack(trackID: string) {
    const data = await this.get(`tracks/${trackID}`);
    return { ...data, id: data._id };
  }
}

export { TrackAPI };
