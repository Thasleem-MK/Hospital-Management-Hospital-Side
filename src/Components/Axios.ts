import axios from "axios";

export const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_AXIOS_BASEURL,
  baseURL: "http://localhost:3000",
});
