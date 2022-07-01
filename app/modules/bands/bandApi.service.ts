import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IBand } from "./band.interface";

class BandAPI extends RESTDataSource {
  PORT = Number(process.env.BAND_PORT) || 3003;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getBands() {
    const data = await this.get("bands");
    return data.items.map((item: IBand) => ({ ...item, id: item._id }));
  }

  async getBand(bandID: string) {
    const { members, ...data } = await this.get(`bands/${bandID}`);
    if (!data) {
      console.log(`band ID ${bandID} isn't correct`);
      return;
    }
    return { ...data, id: data._id, membersId: members };
  }
}

export { BandAPI };
