
import { apiLinks } from "@/configs/routes";
import http from "@/lib/http";
import { BrandListResType, CreateBrandBodyType } from "@/schemaValidations/brand.schema";
import { UsersListResType } from "@/schemaValidations/users.schema";
import { headers } from "next/headers";

const userApiRequest = {
  getListUsers: (token: string) =>
    http.get<UsersListResType>(
      apiLinks.users,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};


export default userApiRequest;
