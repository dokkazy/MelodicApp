import { z } from "zod";

export const shippingInfoSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    province: z.string(),
    district: z.string(),
    ward: z.string(),
    paymentMethod: z.string(),
}).strict();

export type ShippingInfoType = z.TypeOf<typeof shippingInfoSchema>;
