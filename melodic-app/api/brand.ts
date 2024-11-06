import {
    ProductListResType,
    ProductDetailResType,
    ProductResType,
    CreateProductBodyType,
    UpdateProductBodyType,
  } from "@/schemaValidations/product.schema";
  import { apiLinks } from "@/configs/routes";
  import http from "@/lib/http";
import { BrandListResType } from "@/schemaValidations/brand.schema";
  
  const brandApiRequest = {
    getListBrand: () =>
      http.get<BrandListResType>(apiLinks.brand),
  };
  
  export default brandApiRequest;
  