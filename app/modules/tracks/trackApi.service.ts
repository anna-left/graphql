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
    console.log("id ---", trackID);
    const data = await this.get(`tracks/${trackID}`);
    console.log("data --- ", data);
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

  async updateTrack(trackData: ITrack) {
    const findTrack = await this.getTrack(trackData._id);
    console.log("updateTrack track ---", findTrack);
    if (!findTrack) {
      console.log(`Could not find track with ID ${trackData._id}`);
      return null;
    }
    // console.log("updateTrack ---", findTrack);
    const updTrack = {
      id: trackData._id,
      _id: trackData._id,
      title: trackData.title || findTrack.title,
      duration: trackData.duration || findTrack.duration,
      released: trackData.released || findTrack.released,
      albumId: trackData.albumId || findTrack.albumId,
    };

    console.log("updateTrack(track ---", updTrack);
    const data = await this.put(`tracks/${findTrack._id}`, updTrack);
    return { ...data, id: data._id };
  }

  async deleteTrack(id: string) {
    const track = await this.getTrack(id);
    if (!track) {
      console.log(`Could not find track with ID ${id}`);
      return null;
    }

    //удалить ссылки в альбоме и в фаворите

    return await this.delete(`tracks/${id}`);
  }
}

export { TrackAPI };
