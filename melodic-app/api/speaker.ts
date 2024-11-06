import {
  ProductListResType,
  ProductDetailResType,
  ProductResType,
  CreateProductBodyType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { apiLinks } from "@/configs/routes";
import http from "@/lib/http";

const speakerApiRequest = {
  getListSpeakers: (queryParams?: string) =>
    http.get<ProductListResType>(apiLinks.speakerOData + (queryParams || "")),
  getSpeakerDetails: (id: string) =>
    http.get<ProductDetailResType>(apiLinks.speaker + `/${id}`, {}),
  deleteSpeakers: (id: string) =>
    http.delete<ProductResType>(apiLinks.speaker + `/${id}`,{}),
  createSpeaker: (body : CreateProductBodyType) =>
    http.post(apiLinks.speaker, body),
  updateSpeaker: (id : string, body : UpdateProductBodyType) =>
    http.put(apiLinks.speaker + `/${id}`, body) 
};

export default speakerApiRequest;
