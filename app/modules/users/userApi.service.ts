import "dotenv/config";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IJwt, IUser, IUserInput } from "./user.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class UserAPI extends RESTDataSource {
  PORT = Number(process.env.USER_PORT) || 3004;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    if (GLOBAL_VALUES.token) {
      request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
    }
  }

  async getUser(userID: string) {
    try {
      const data: IUser = await this.get(`users/${userID}`);
      if (!data) {
        console.log(`Could not find user with ID ${userID}`);
        return;
      }
      return { ...data, id: data._id };
    } catch (error) {
      console.log(`Could not find user with ID ${userID}`);
      return;
    }
  }

  async getUserByToken() {
    const data: IJwt = await this.post(`users/verify`);
    if (!data) {
      console.log(`Unable to verify user`);
      return;
    }
    return { ...data, id: data._id };
  }

  async registerUser(user: IUserInput) {
    const data = await this.post("users/register", user);
    return { ...data, id: data._id };
  }

  async login(user: IUserInput) {
    const data = await this.post("users/login", user);
    return data.jwt;
  }
}

export { UserAPI };
