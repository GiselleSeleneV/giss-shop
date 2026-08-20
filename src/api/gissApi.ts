import axios from "axios";

const gissApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Interceptors

export default gissApi;
