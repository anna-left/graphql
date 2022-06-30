import { RESTDataSource } from "apollo-datasource-rest";
import { IGenre } from "./genre.interface";

class GenreAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/v1/";
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
