import axios, { type AxiosInstance } from "axios";

export class Request {
  private static instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
}