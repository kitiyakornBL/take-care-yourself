import { api } from "src/boot/axios";

export const covidService = {
  async fetchCovidToday() {
    try {
      const response = await api.get("api/Cases/today-cases-all");
      return response.data[0];
    } catch (e) {
      console.error(e);
    }
  },
  async fetchCovidByProvinces() {
    try {
      const response = await api.get(`api/Cases/today-cases-by-provinces`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
};
