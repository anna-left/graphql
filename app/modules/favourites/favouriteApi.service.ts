import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IFavourite } from "./favourite.interface";

class FavouriteAPI extends RESTDataSource {
  PORT = Number(process.env.FAVOURITE_PORT) || 3007;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getFavourites(limit = 0, offset = 0) {
    const data = await this.get("favourites", { limit, offset });
    return data.items.map((item: IFavourite) => ({ ...item, id: item._id }));
  }

  async getIFavourite(favouriteID: string) {
    const data = await this.get(`favourites/${favouriteID}`);
    if (!data) {
      console.log(`Could not find favourite with ID ${favouriteID}`);
      return;
    }
    return { ...data, id: data._id };
  }
}

export { FavouriteAPI };
