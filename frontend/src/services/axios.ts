import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.56.1:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // headers: {
  //   Accept: "application/json, text/plain, */*",
  // },
  withCredentials: true,
});

export default axiosInstance;
