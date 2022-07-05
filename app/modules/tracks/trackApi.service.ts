import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { ITrack, ITrackInput, ITrackUpdate } from "./track.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class TrackAPI extends RESTDataSource {
  PORT = Number(process.env.TRACK_PORT) || 3006;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getTracks(limit = 0, offset = 0) {
    const data = await this.get("tracks", { limit, offset });
    return data.items.map((item: ITrack) => ({ ...item, id: item._id }));
  }

  async getTrack(trackID: string) {
    console.log("id ---", trackID);
    try {
      const data = await this.get(`tracks/${trackID}`);
      console.log("data --- ", data);
      if (!data) {
        console.log(`Could not find track with ID ${trackID}`);
        return;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find album with ID ${trackID}`);
      return GLOBAL_VALUES.OBJECT_NOT_EXISTS;
    }
  }

  async createTrack(track: ITrackInput) {
    console.log("createTrack(track ---", track);
    const data = await this.post("tracks", track);
    return { ...data, id: data._id };
  }

  async updateTrack(trackData: ITrackUpdate) {
    console.log("trackData.id ---", trackData);
    const track = await this.getTrack(trackData.id);
    console.log("updateTrack track ---", track);
    if (!track) {
      console.log(`Could not find track with ID ${trackData.id}`);
      return null;
    }
    // console.log("updateTrack ---", track);

    const updTrack = {
      // id: trackData.id,
      id: trackData.id,
      title: trackData.title || track.title,
      albumId: trackData.albumId || track.albumId,
      artistsIds: trackData.artistsIds || track.artistsIds,
      duration: trackData.duration || track.duration,
      released: trackData.released || track.released,
      genresIds: trackData.genresIds || track.genresIds,
    };

    console.log("updateTrack new ---", updTrack);
    const data = await this.put(`tracks/${trackData.id}`, updTrack);
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
