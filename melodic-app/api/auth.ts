import {
  LoginResponseSchemaType,
  LoginSchemaType,
  RegisterResponseSchemaType,
  RegisterSchemaType,
} from "@/schemaValidations/auth.schema";
import { apiClientLinks, apiLinks } from "@/configs/routes";
import http from "@/lib/http";

const authApiRequest = {
  login: (body: LoginSchemaType) =>
    http.post<LoginResponseSchemaType>(apiLinks.login, body),
  register: (body: Omit<RegisterSchemaType, "confirmPassword">) =>
    http.post<RegisterResponseSchemaType>(apiLinks.register, body),
  setToken: (body: { sessionToken: string; role: string }) =>
    http.post<LoginResponseSchemaType>(apiClientLinks.setToken, body, {
      baseURL: "",
    }),
  getRole: () =>
    http.get<{ role: string }>(apiClientLinks.getRole, { baseURL: "" }),
};

export default authApiRequest;
