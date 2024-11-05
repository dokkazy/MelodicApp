import exp from "constants";
import z from "zod";

// Define Brand DTO schema
const BrandDto = z.object({
  BrandId: z.string(),
  Name: z.string(),
});
export const CreateProductBody = z.object({
  name: z.string().min(1).max(256),
  brandId: z.string(),
  price: z.coerce.number().positive(),
  decription: z.string().max(10000),
  unitInStock: z.coerce.number().int().nonnegative(), 
  mainImg: z.string().url() 
});

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

export const UpdateProductBody = z.object({
  id : z.string(),
  name: z.string().min(1).max(256),
  brandId: z.string(),
  price: z.coerce.number().positive(),
  decription: z.string().max(10000),
  unitInStock: z.coerce.number().int().nonnegative(), 
  img: z.string().url() 
})

export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>

// Define Speaker DTO schema
const ProductSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  CreateAt: z.date().transform((dateString) => new Date(dateString)).nullable(),
  Price: z.number().positive(),
  Decription: z.string(),
  UnitInStock: z.number(),
  Img: z.string(),
  Brand: BrandDto,
});
export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})

export type ProductResType = z.TypeOf<typeof ProductRes>


export type ProductType = z.TypeOf<typeof ProductSchema>;

const ProductDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  decription: z.string(),
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
