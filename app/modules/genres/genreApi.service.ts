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
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getGenres(limit = 0, offset = 0) {
    const data = await this.get("genres", { limit, offset });
    return data.items.map((item: IGenre) => ({ ...item, id: item._id }));
  }

  async getGenre(genreID: string) {
    console.log(`find genre with ID --- ${genreID}`);
    try {
      const data = await this.get(`genres/${genreID}`);
      console.log("data genre ---", data);
      if (!data._id || data._id === GLOBAL_VALUES.MESSAGE_NOT_EXISTS) {
        console.log(`Could not find genre with ID ${genreID}`);
        return GLOBAL_VALUES.OBJECT_NOT_EXISTS;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find genre with ID ${genreID}`);
      return GLOBAL_VALUES.OBJECT_NOT_EXISTS;
    }
  }

  async createGenre(genre: IGenreInput) {
    // console.log("createGenre(genre ---", genre);
    const data = await this.post("genres", genre);
    return { ...data, id: data._id };
  }

  async updateGenre(id: string, genreData: IGenreInput) {
    // console.log("updateGenre  id ---", id);
    const genre = await this.getGenre(id);
    // console.log("updateGenre genre ---", genre);
    if (!genre) {
      console.log(`Could not find genre with ID ${id}`);
      return null;
    }
    // console.log("updateGenre(genre ---", genreData);
    const updGenre = {
      id,
      _id: id,
      name: genreData.name || genre.name,
      description: genreData.description || genre.description,
      country: genreData.country || genre.country,
      year: genreData.year || genre.year,
    };
    // console.log("updGenre --- ", updGenre);
    const data = await this.put(`genres/${id}`, updGenre);
    return data;
  }

  async deleteGenre(id: string) {
    const genre = await this.getGenre(id);
    if (!genre) {
      console.log(`Could not find genre with ID ${id}`);
      return null;
    }
    return await this.delete(`genres/${id}`);
  }
}

export { GenreAPI };
