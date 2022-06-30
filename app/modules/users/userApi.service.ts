import { RESTDataSource } from "apollo-datasource-rest";
import { IUser } from "./user.interface";

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3004/v1/";
  }

  async getUser(userID: string) {
    console.log(this.get(`users/${userID}`));
    const data: IUser = await this.get(`users/${userID}`);
    return { ...data, id: data._id };
  }
}

export { UserAPI };
