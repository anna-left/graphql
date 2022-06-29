import { RESTDataSource } from "apollo-datasource-rest";

class GenreAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3001/v1/";
  }

  getGenres() {
    // console.log(this.get("genres").then((data) => console.log(data)));
    return this.get("genres").then((data) =>
      data.items.map((item: any) => ({ ...item, id: item._id }))
    );
  }

  getGenre(genreID: string) {
    return this.get(`genres/${genreID}`);
  }

}

export { GenreAPI };
