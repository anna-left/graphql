import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IFavouriteInput } from "./favourite.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class FavouriteAPI extends RESTDataSource {
  PORT = Number(process.env.FAVOURITE_PORT) || 3007;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getFavourites() {
    const data = await this.get("favourites");
    if (!data) {
      return;
    }
    return { ...data, id: data._id };
  }

  async addToFavourites(userID: string, dataFavourite: IFavouriteInput) {
    const data = await this.put(`favourites/add?user=${userID}`, dataFavourite);
    return { ...data, id: data._id };
  }
}

export { FavouriteAPI };
