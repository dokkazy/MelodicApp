import {
    LoginResponseSchemaType,
    LoginSchemaType,
    RegisterResponseSchemaType,
    RegisterSchemaType,
  } from "@/app/schemaValidations/auth.schema";
import { ProductListResType, ProductDetailResType } from "@/app/schemaValidations/product.schema";
  import { apiClientLinks, apiLinks } from "@/configs/routes";
  import http from "@/lib/http";
  
  const speakerApiRequest = {
    getListSpeakers: (queryParams?: string) => 
        http.get<ProductListResType>(apiLinks.speakerOData + (queryParams || "")),
    getDetail : (id : string) => 
        http.get<ProductDetailResType>(apiLinks.speaker +`/${id}`),

  };
  
  export default speakerApiRequest;
  