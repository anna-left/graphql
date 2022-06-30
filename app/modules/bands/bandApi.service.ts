import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";
import { IBand } from "./band.interface";

class BandAPI extends RESTDataSource {
  PORT = Number(process.env.BAND_PORT) || 3003;
  constructor() {
    super();
    // this.baseURL = "http://localhost:3003/v1/";
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  async getBands() {
    const data = await this.get("bands");
    return data.items.map((item: IBand) => ({ ...item, id: item._id }));
  }

  async getBand(bandID: string) {
    console.log(this.get(`bands/${bandID}`));
    const data = await this.get(`bands/${bandID}`);
    return { ...data, id: data._id };
  }
}

export { BandAPI };
