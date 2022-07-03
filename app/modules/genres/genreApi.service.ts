import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IGenre, IGenreInput } from "./genre.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class GenreAPI extends RESTDataSource {
  PORT = Number(process.env.GENRE_PORT) || 3001;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    console.log("GLOBAL_VALUES.token ----- ", GLOBAL_VALUES.token);
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getGenres(limit = 0, offset = 0) {
    const data = await this.get("genres", { limit, offset });
    return data.items.map((item: IGenre) => ({ ...item, id: item._id }));
  }

  async getGenre(genreID: string) {
    const data = await this.get(`genres/${genreID}`);
    if (!data) {
      console.log(`genre ID ${genreID} isn't correct`);
      return;
    }
    return { ...data, id: data._id };
  }

  async createGenre(genre: IGenreInput) {
    console.log("createGenre(genre ---", genre);
    const data = await this.post("genres", genre);
    return { ...data, id: data._id };
  }
}

export { GenreAPI };
