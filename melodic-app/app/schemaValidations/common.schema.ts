import z from "zod";

export const MessageRes = z.object({
  message: z.string(),
});

export type MessageResType = z.TypeOf<typeof MessageRes>;