
import z from "zod";

const Brand = z.object({
    brandId: z.string(),
    name: z.string(),
});

export type BrandListResType = z.TypeOf<typeof Brand>

export const CreateBrandBody = z.object({
    name: z.string().min(1).max(256)
});

export type CreateBrandBodyType = z.TypeOf<typeof CreateBrandBody>