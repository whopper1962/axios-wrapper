import Axios, { AxiosError, type AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { onRequest } from "./interceptors/onRequest";
import { onResponse } from "./interceptors/onResponse";
import { onErrorResponse } from "./interceptors/onErrorResponse";

export const ErrorStatusCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
} as const;
export type ErrorStatusCode =
  (typeof ErrorStatusCode)[keyof typeof ErrorStatusCode];

export const isApiClientError = (error: unknown): error is AxiosError => {
  return Axios.isAxiosError(error);
};

export class ApiService {
  private _client: AxiosInstance;

  constructor() {
    this._client = Axios.create({
      // baseURL: import.meta.env.VITE_API_BASE_URL,
      baseURL: "http://localhost:3000",
      responseType: "json" as const,
      timeout: 30000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this._client.interceptors.request.use(onRequest);
    this._client.interceptors.response.use(onResponse, onErrorResponse);
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this._client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this._client.post<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this._client.patch<
        T,
        AxiosResponse<T>,
        D
      >(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this._client.post<T>(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
