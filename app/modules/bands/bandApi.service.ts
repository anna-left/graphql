import "dotenv/config";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { IBand, IBandInput, IBandUpdate } from "./band.interface";
import { GLOBAL_VALUES } from "../../utils/constants";

class BandAPI extends RESTDataSource {
  PORT = Number(process.env.BAND_PORT) || 3003;
  constructor() {
    super();
    this.baseURL = `http://localhost:${this.PORT}/v1/`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${GLOBAL_VALUES.token}`);
  }

  async getBands(limit = 0, offset = 0) {
    const data = await this.get("bands", { limit, offset });
    return data.items.map((item: IBand) => ({ ...item, id: item._id }));
  }

  async getBand(bandID: string) {
    // const { members, ...data } = await this.get(`bands/${bandID}`);
    try {
      const data = await this.get(`bands/${bandID}`);
      if (!data) {
        console.log(`Could not find band with ID${bandID}`);
        return;
      }
      return { ...data, id: data._id };
      // return { ...data, id: data._id, membersId: members };
    } catch (error) {
      console.log(`err Could not find album with ID ${bandID}`);
      return;
    }
  }

  async createBand(band: IBandInput) {
    const data = await this.post("bands", band);
    return { ...data, id: data._id };
  }

  async updateBand(bandData: IBandUpdate) {
    console.log("updateBand  bandData ---", bandData);
    const band = await this.getBand(bandData.id);
    console.log("updateBand band ---", band);
    if (!band) {
      console.log(`Could not find band with ID ${bandData.id}`);
      return null;
    }

    const updBand = {
      id: bandData.id,
      name: bandData.name || band.name,
      origin: bandData.origin || band.origin,
      website: bandData.website || band.website,
      genresIds: bandData.genresIds || band.genres,
    };
    console.log("updBand new --- ", updBand);
    const data = await this.put(`bands/${band.id}`, updBand);
    return { ...data, id: data._id };
  }

  async deleteBand(id: string) {
    const band = await this.getBand(id);
    if (!band) {
      console.log(`Could not find band with ID ${id}`);
      return null;
    }
    return await this.delete(`bands/${id}`);
  }
}

export { BandAPI };
