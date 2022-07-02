import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IUser, IUserInput } from "./user.interface";

class UserAPI extends RESTDataSource {
  PORT = Number(process.env.USER_PORT) || 3004;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getUser(userID: string) {
    const data: IUser = await this.get(`users/${userID}`);
    if (!data) {
      console.log(`user ID ${userID} isn't correct`);
      return;
    }
    return { ...data, id: data._id };
  }

  async registerUser(user: IUserInput) {
    console.log("user ---", user);
    const data = await this.post("users/register", user);
    console.log("---data", data);
    return { ...data, id: data._id };
  }

  async login(user: IUser) {
    console.log("dataUser ---", user);
    const qq = {
      password: "saaa222aaa",
      email: "saaa@mail.ru",
    };
    const data = await this.post("users/login", qq);
    console.log("---data", data);

    return data.jwt;
  }
}

export { UserAPI };
