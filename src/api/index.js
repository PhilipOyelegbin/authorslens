import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
})