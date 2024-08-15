import axios from "axios";
// import { useLocalStorage } from "../hooks/useLocalStorage";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["auth"] = `Bearer ${token}`;
  }
  return config;
});

//response

//error

//refreshToken
