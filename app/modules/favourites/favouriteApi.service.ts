import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IFavourite, IFavouriteInput } from "./favourite.interface";
import { GLOBAL_VALUES } from "../../utils/constants";
// import { IGenreInput } from "../genres/genre.interface";

class FavouriteAPI extends RESTDataSource {
  PORT = Number(process.env.FAVOURITE_PORT) || 3007;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
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

  async addToFavourites(userID: string, dataFavourite: IFavouriteInput) {
    console.log("createFavourite ---", dataFavourite);
    console.log("userID ---", userID);
    const data = await this.put(`favourites/add?user=${userID}`, dataFavourite);
    console.log("data ---", data);
    return { ...data, id: data._id };
  }
}

export { FavouriteAPI };
