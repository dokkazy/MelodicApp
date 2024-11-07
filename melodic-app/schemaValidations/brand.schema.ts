
import z from "zod";

const Brand = z.object({
    brandId: z.string(),
    name: z.string(),
});

export type BrandListResType = z.TypeOf<typeof Brand>

