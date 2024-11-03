import authApiRequest from "@/api/auth";
import envConfig from "@/configs/config";
import { apiClientLinks } from "@/configs/routes";
import { UserRole } from "@/schemaValidations/auth.schema";

export const formatPrice = (price: number) => {
  if (price == null || typeof price == "string") return "0";
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const checkIsImg = (url: string) => {
  // return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  if (url == null || url == "") return false;
  return url.includes("/");
};

export const toUpperCase = (str: string) => {
  return str.toUpperCase();
};

export const checkUserRole = async () => {
  const res = await authApiRequest.getRole();
  console.log(res);
  switch (res.status) {
    case 200: {
      if (res.payload.role === UserRole.Admin) {
        return 1;
      } else {
        return 0;
      }
    }
    case 401: {
      return -1;
    }
  }
};
