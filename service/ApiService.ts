import Axios, { AxiosError, type AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { onRequest } from "./interceptors/onRequest";
import { onResponse } from "./interceptors/onResponse";
import { onErrorResponse } from "./interceptors/onErrorResponse";

export interface IApiService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const ErrorStatusCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
} as const;
export type ErrorStatusCode =
  (typeof ErrorStatusCode)[keyof typeof ErrorStatusCode];

export function isApiClientError(error: unknown): error is AxiosError {
  return Axios.isAxiosError(error);
}

export class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      // baseURL: import.meta.env.VITE_API_BASE_URL,
      baseURL: "http://localhost:3000",
      responseType: "json" as const,
      timeout: 30000,
    });
    this.client.interceptors.request.use(onRequest);
    this.client.interceptors.response.use(onResponse, onErrorResponse);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.patch<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
