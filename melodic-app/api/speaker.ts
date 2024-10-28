import {
  ProductListResType,
  ProductDetailResType,
} from "@/schemaValidations/product.schema";
import { apiLinks } from "@/configs/routes";
import http from "@/lib/http";

const speakerApiRequest = {
  getListSpeakers: (queryParams?: string) =>
    http.get<ProductListResType>(apiLinks.speakerOData + (queryParams || "")),
  getSpeakerDetails: (id: string) =>
    http.get<ProductDetailResType>(apiLinks.speaker + `/${id}`, {}),
};

export default speakerApiRequest;
