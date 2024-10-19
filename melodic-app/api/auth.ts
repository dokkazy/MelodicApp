import {
  LoginResponseSchemaType,
  LoginSchemaType,
  RegisterResponseSchemaType,
  RegisterSchemaType,
} from "@/app/schemaValidations/auth.schema";
import { apiClientLinks, apiLinks } from "@/configs/routes";
import http from "@/lib/http";

const authApiRequest = {
  login: (body: LoginSchemaType) =>
    http.post<LoginResponseSchemaType>(apiLinks.login, body),
  register: (body: Omit<RegisterSchemaType, "confirmPassword">) =>
    http.post<RegisterResponseSchemaType>(apiLinks.register, body),
  setToken: (body: { sessionToken: string }) =>
    http.post<LoginResponseSchemaType>(apiClientLinks.setToken, body, {
      baseURL: "",
    }),
  logout: () => http.post<void>(apiLinks.logout),
};

export default authApiRequest;