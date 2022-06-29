import { RESTDataSource } from "apollo-datasource-rest";
import { IBand } from "./interface-band";

class BandAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3003/v1/";
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
