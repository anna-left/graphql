import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IAlbum, IAlbumInput } from "./album.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class AlbumAPI extends RESTDataSource {
  PORT = Number(process.env.ALBUM_PORT) || 3005;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    console.log("GLOBAL_VALUES.token ---", GLOBAL_VALUES.token);
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getAlbums(limit = 0, offset = 0) {
    const data = await this.get("albums", { limit, offset });
    return data.items.map((item: IAlbum) => ({ ...item, id: item._id }));
  }

  async getAlbum(albumID: string) {
    const data = await this.get(`albums/${albumID}`);
    if (!data) {
      console.log(`Could not find album with ID ${albumID}`);
      return;
    }
    return { ...data, id: data._id };
  }

  async createAlbum(album: IAlbumInput) {
    console.log("createAlbum(album ---", album);
    const data = await this.post("albums", album);
    return { ...data, id: data._id };
  }
}

export { AlbumAPI };
