import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { ITrack, ITrackInput } from "./track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class TrackAPI extends RESTDataSource {
  PORT = Number(process.env.TRACK_PORT) || 3006;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    console.log("GLOBAL_VALUES.token ---", GLOBAL_VALUES.token);
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getTracks(limit = 0, offset = 0) {
    const data = await this.get("tracks", { limit, offset });
    return data.items.map((item: ITrack) => ({ ...item, id: item._id }));
  }

  async getTrack(trackID: string) {
    const data = await this.get(`tracks/${trackID}`);
    if (!data) {
      console.log(`Could not find track with ID ${trackID}`);
      return;
    }
    return { ...data, id: data._id };
  }

  async createTrack(track: ITrackInput) {
    console.log("createTrack(track ---", track);
    const data = await this.post("tracks", track);
    return { ...data, id: data._id };
  }
}

export { TrackAPI };
