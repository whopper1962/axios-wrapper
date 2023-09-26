import type { AxiosError } from "axios";

export const onErrorResponse = (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  // if (import.meta.env.MODE === "development") {
  //   console.error(error);
  // }
  console.error(error);
  return Promise.reject(error);
};
