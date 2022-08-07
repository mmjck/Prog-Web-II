
import axios from "axios";
import Config from "../config/services"

const client = axios.create({
  baseURL: Config.baseUrl,
});

export default client;
