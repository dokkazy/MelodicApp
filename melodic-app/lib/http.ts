/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/configs/config";
import { apiLinks } from "@/configs/routes";

class HttpError {
  constructor(
    public status: number,
    public payload: any
  ){}
}

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type CustomOptionsType = Omit<RequestInit, "method"> & {
  baseURL?: string | undefined;
};

const request = async <Response>(
  method: MethodType,
  url: string,
  options?: CustomOptionsType | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };
  const baseURL =
    options?.baseURL === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseURL;

  const fullURL = url.startsWith("/")
    ? `${baseURL}${url}`
    : `${baseURL}/${url}`;

  const response = await fetch(fullURL, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const payload: Response = await response.json();
  const data = {
    status: response.status,
    payload,
  };
  if (!response.ok) {
    if (response.status === 400) {
      return new HttpError(response.status, payload);
    }
  }
  return data;
};

const http = {
  get: <Response>(
    url: string,
    options?: Omit<CustomOptionsType, "body"> | undefined
  ) => {
    return request<Response>("GET", url, options);
  },
  post: <Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptionsType, "body"> | undefined
  ) => {
    return request<Response>("POST", url, { ...options, body });
  },
  put: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, "body"> | undefined
  ) => {
    return request<Response>("PUT", url, options);
  },
  delete: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, "body"> | undefined
  ) => {
    return request<Response>("DELETE", url, options);
  },
};

export default http;
