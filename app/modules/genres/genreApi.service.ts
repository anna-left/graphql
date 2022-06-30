import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IGenre } from "./genre.interface";

class GenreAPI extends RESTDataSource {
  PORT = Number(process.env.GENRE_PORT) || 3007;
  constructor() {
    super();
    // this.baseURL = "http://localhost:3001/v1/";
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getGenres() {
    const data = await this.get("genres");
    return data.items.map((item: IGenre) => ({ ...item, id: item._id }));
  }

  async getGenre(genreID: string) {
    console.log(this.get(`genres/${genreID}`));
    const data = await this.get(`genres/${genreID}`);
    return { ...data, id: data._id };
  }
}

export { GenreAPI };
