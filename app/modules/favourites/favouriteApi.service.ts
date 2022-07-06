import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IFavouriteInput } from "./favourite.interface";
import { GLOBAL_VALUES } from "../../utils/constants";
// import { IGenreInput } from "../genres/genre.interface";

class FavouriteAPI extends RESTDataSource {
  PORT = Number(process.env.FAVOURITE_PORT) || 3007;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    console.log(GLOBAL_VALUES.token);
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getFavourites(limit = 0, offset = 0) {
    console.log("---", limit, offset);
    const data = await this.get("favourites");
    console.log("--- data --- ", data);
    // return data.map((item: IFavourite) => ({ ...item, id: item._id }));
    return { ...data, id: data._id };
  }

  async addToFavourites(userID: string, dataFavourite: IFavouriteInput) {
    //**************TODO */
    //проверить существует ли объект перед добавлением

    console.log("createFavourite ---", dataFavourite);
    console.log("userID ---", userID);
    const data = await this.put(`favourites/add?user=${userID}`, dataFavourite);
    console.log("data ---", data);
    return { ...data, id: data._id };
  }
}

export { FavouriteAPI };
