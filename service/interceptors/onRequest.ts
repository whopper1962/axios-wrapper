import type { InternalAxiosRequestConfig } from "axios";

export const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  // if (import.meta.env.MODE === "development") {
  //   const { method, baseURL, url } = config;
  //   const fullUrl = `${baseURL}${url}`;
  //   console.log(`🚀 ${method?.toUpperCase()}: ${fullUrl} Request`, config);
  // }
  const { method, baseURL, url } = config;
  const fullUrl = `${baseURL}${url}`;
  console.log(`🚀 ${method?.toUpperCase()}: ${fullUrl} Request`, config);
  return config;
};
