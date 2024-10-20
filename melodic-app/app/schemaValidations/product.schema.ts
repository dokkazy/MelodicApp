import z from "zod";

// Define Brand DTO schema
const BrandDto = z.object({
  BrandId: z.string(),
  Name: z.string(),
});

// Define Speaker DTO schema
const ProductSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  CreateAt: z.date().transform((dateString) => new Date(dateString)),
  Price: z.number().positive(),
  Description: z.string(),
  UnitInStock: z.number(),
  Img: z.string(),
  Brand: BrandDto,
});

const ProductDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  unitInStock: z.number(),
  img: z.string(),
  brand: BrandDto,
});

export type ProductDetailResType = z.TypeOf<typeof ProductDetailSchema>;

// Update ProductListRes schema to match the actual API response
export const ProductListRes = z.object({
  value: z.array(ProductSchema),
  "@odata.count": z.number(),
});

export type ProductListResType = z.TypeOf<typeof ProductListRes>;
