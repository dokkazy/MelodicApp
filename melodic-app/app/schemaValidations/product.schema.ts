import z from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brandId: z.string().uuid(),
  price: z.number().positive(),
  description: z.string(),
  unitInStock: z.number().int().nonnegative(),
  img: z.string().url(),
});

export type ProductSchemaType = z.TypeOf<typeof productSchema>;
