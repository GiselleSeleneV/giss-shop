import axios from "axios";

const gissApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Interceptors
gissApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default gissApi;
