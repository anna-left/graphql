import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IGenre, IGenreInput, IGenreUpdate } from "./genre.interface";
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
    try {
      const data = await this.get(`genres/${genreID}`);
      if (!data._id) {
        console.log(`Could not find genre with ID ${genreID}`);
        return;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find genre with ID ${genreID}`);
      return;
    }
  }

  async createGenre(genre: IGenreInput) {
    const data = await this.post("genres", genre);
    return { ...data, id: data._id };
  }

  async updateGenre(genreData: IGenreUpdate) {
    const genre = await this.getGenre(genreData.id);
    if (!genre) {
      console.log(`Could not find genre with ID ${genreData.id}`);
      return null;
    }
    const updGenre = {
      id: genreData.id,
      name: genreData.name || genre.name,
      description: genreData.description || genre.description,
      country: genreData.country || genre.country,
      year: genreData.year || genre.year,
    };
    const data = await this.put(`genres/${genre.id}`, updGenre);
    return { ...data, id: data._id };
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
