import axios from "axios";

const api = axios.create({
  baseURL: 'https://hope-green-api-virid.vercel.app/'
});

export { api };