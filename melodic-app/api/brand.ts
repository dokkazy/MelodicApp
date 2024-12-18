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
  
  const brandApiRequest = {
    getListBrand: () =>
      http.get<BrandListResType>(apiLinks.brand),
    createBrand: (body: CreateBrandBodyType) =>
      http.post(apiLinks.brand, body),
    deleteBrand: (id : string) =>
      http.delete<BrandListResType>(apiLinks.brand + `/${id}`,{}),

  };
  
  export default brandApiRequest;
  