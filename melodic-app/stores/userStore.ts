/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";

import authApiRequest from "@/api/auth";
import envConfig from "@/configs/config";
import { apiClientLinks, apiLinks } from "@/configs/routes";
import { HttpError } from "@/lib/http";
import {
  LoginResponseSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
} from "@/schemaValidations/auth.schema";
import { createSelectors } from "./createSelectors";

type userState = {
  user: LoginResponseSchemaType;
  sessionToken: string;
  loading: boolean;
  isSignedIn: boolean;
  error: HttpError | null;
};

type userActions = {
  login: (user: LoginSchemaType) => void;
  register: (user: RegisterSchemaType) => void;
  logout: () => void;
  reset: () => void;
};

const initialState: userState = {
  user: {
    email: "",
    token: "",
    id: "",
    userName: "",
  },
  sessionToken: "",
  loading: false,
  isSignedIn: false,
  error: null,
};

export type UserStoreType = userState & userActions;

export const createUserStore = (initState: userState = initialState) => {

  return createStore<UserStoreType>((set, get) => ({
    ...initialState,
    login: async (user: LoginSchemaType) => {
      try {
        set({ loading: true });
        const response = await authApiRequest.login(user);
  
        switch (response.status) {
          case 200: {
            const responseFromNextServer: any = await authApiRequest.setToken({
              sessionToken: response.payload?.token,
            });
            if (responseFromNextServer.status !== 200) {
              throw new Error(responseFromNextServer.payload?.message);
            }
  
            set({ sessionToken: response.payload?.token, isSignedIn: true });
          }
          case 404:
          case 400: {
            set({ error: new HttpError(response.status, response.payload) });
          }
          default: {
            set({ error: new HttpError(response.status, response.payload) });
          }
        }
      } catch (error: any) {
        console.log(error);
        set({
          error: new HttpError(
            error.status || 500,
            error.message || "An error occurred",
          ),
        });
        throw error;
      } finally {
        set({ loading: false });
      }
    },
    reset: () => {
      set(initialState);
    },
    register: async (user: RegisterSchemaType) => {},
    logout: async () => {
      try {
        await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}${apiLinks.logout}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${get().user.token}`,
          },
        }).then(async (res) => {
          if (res.ok) {
            await fetch(
              `${envConfig.NEXT_PUBLIC_API_CLIENT}${apiClientLinks.removeToken}`,
              { method: "POST" },
            );
            set(initialState);
          }
        });
      } catch (error: any) {
        throw error;
      }
    },
  }));
}

