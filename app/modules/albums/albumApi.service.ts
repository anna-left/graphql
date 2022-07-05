import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IAlbum, IAlbumInput, IAlbumUpdate } from "./album.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class AlbumAPI extends RESTDataSource {
  PORT = Number(process.env.ALBUM_PORT) || 3005;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getAlbums(limit = 0, offset = 0) {
    const data = await this.get("albums", { limit, offset });
    return data.items.map((item: IAlbum) => ({ ...item, id: item._id }));
  }

  async getAlbum(albumID: string) {
    console.log("albumID --- ", albumID);
    try {
      const data = await this.get(`albums/${albumID}`);
      if (!data) {
        console.log(`Could not find album with ID ${albumID}`);
        return GLOBAL_VALUES.OBJECT_NOT_EXISTS;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find album with ID ${albumID}`);
      return GLOBAL_VALUES.OBJECT_NOT_EXISTS;
    }
  }

  async createAlbum(album: IAlbumInput) {
    console.log("createAlbum(album ---", album);
    const data = await this.post("albums", album);
    return { ...data, id: data._id };
  }

  async updateAlbum(albumData: IAlbumUpdate) {
    console.log("albumData.id ---", albumData);
    const album = await this.getAlbum(albumData.id);
    console.log("updateAlbum album ---", album);
    if (!album) {
      console.log(`Could not find album with ID ${albumData.id}`);
      return null;
    }
    // console.log("updateAlbum ---", album);
    const updAlbum = {
      id: albumData.id,
      name: albumData.name || album.name,
      released: albumData.released || album.released,
      artistsIds: albumData.artistsIds || album.artistsIds,
      bandsIds: albumData.bandsIds || album.bandsIds,
      trackIds: albumData.trackIds || album.trackIds,
      genresIds: albumData.genresIds || album.genresIds,
      image: albumData.image || album.image,
    };

    console.log("updateAlbum new ---", updAlbum);
    const data = await this.put(`albums/${albumData.id}`, updAlbum);
    return { ...data, id: data._id };
  }

  async deleteAlbum(id: string) {
    const album = await this.getAlbum(id);
    if (!album) {
      console.log(`Could not find album with ID ${id}`);
      return null;
    }

    //удалить ссылки в альбоме и в фаворите

    return await this.delete(`albums/${id}`);
  }
}

export { AlbumAPI };
