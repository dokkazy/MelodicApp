import { z } from "zod";

export const shippingInfoSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    state: z.string(),
    zipCode: z.string(),
  })
  .strict();

export type ShippingInfoType = z.TypeOf<typeof shippingInfoSchema>;
