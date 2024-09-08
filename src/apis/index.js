import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const baseUrl = "http://localhost:3000/";

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Device: "WEB",
  },
});
