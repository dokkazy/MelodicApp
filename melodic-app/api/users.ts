import {
    ProductListResType,
    ProductDetailResType,
    ProductResType,
    CreateProductBodyType,
    UpdateProductBodyType,
  } from "@/schemaValidations/product.schema";
  import { apiLinks } from "@/configs/routes";
  import http from "@/lib/http";
import { BrandListResType, CreateBrandBodyType } from "@/schemaValidations/brand.schema";
import { UsersListResType } from "@/schemaValidations/users.schema";
  
  const userApiRequest = {
    getListUsers: () =>
      http.get<UsersListResType>(apiLinks.users),
   

  };
  
  export default userApiRequest;
  