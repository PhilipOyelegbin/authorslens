import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    // "Authorization": `Token ${sessionStorage.getItem("token")}`,
    // "Access-Control-Allow-Origin": "https://authorslens-api.vercel.app",
    // "Access-Control-Allow-Methods": ["GET", "PUT", "POST", "DELETE"],
    // "Access-Control-Allow-Headers": "x-requested-with",
    // "Access-Control-Allow-Credentials": false
  },
})