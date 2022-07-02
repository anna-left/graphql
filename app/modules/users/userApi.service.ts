import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IUser } from "./user.interface";

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

  async registerUser(user: IUser) {
    console.log("user ---", user);
    const qq = {
      firstName: "first name",
      lastName: "last name",
      password: "saaa222aaa",
      email: "saaa@mail.ru",
    };
    const data = await this.post("users/register", qq);
    console.log("---data", data);
    return { ...data, id: data._id };
  }
}

export { UserAPI };
