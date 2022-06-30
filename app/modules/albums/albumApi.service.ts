import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IAlbum } from "./album.interface";

class AlbumAPI extends RESTDataSource {
  PORT = Number(process.env.ALBUM_PORT) || 3005;
  constructor() {
    super();
    // this.baseURL = "http://localhost:3003/v1/";
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getAlbums() {
    const data = await this.get("albums");
    return data.items.map((item: IAlbum) => ({ ...item, id: item._id }));
  }

  async getAlbum(albumID: string) {
    const data = await this.get(`albums/${albumID}`);
    return { ...data, id: data._id };
  }
}

export { AlbumAPI };
