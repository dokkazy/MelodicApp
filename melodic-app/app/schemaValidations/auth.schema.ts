import z from "zod";

function formatMessageError(name: string, num: number) {
  return `${name} must contain at least ${num} characters`;
}

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: formatMessageError("First Name", 2) })
      .max(100, { message: formatMessageError("First Name", 100) }),
    lastName: z
      .string()
      .min(2, { message: formatMessageError("Last Name", 2) })
      .max(100, { message: formatMessageError("Last Name", 100) }),
    userName: z.string().email(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: formatMessageError("Password", 6) })
      .max(100),
    confirmPassword: z.string().min(6, {message:formatMessageError("Password", 6)}).max(100),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and Confirm Password must match",
        path: ["confirmPassword"],
      });
    }
    return true;
  });

export type RegisterSchemaType = z.TypeOf<typeof registerSchema>;

export const RegisterResponseSchema = z.object({
  userId: z.string(),
}).strict();

export type RegisterResponseSchemaType = z.TypeOf<typeof RegisterResponseSchema>;

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: formatMessageError("Password", 6) })
      .max(100),
  })
  .strict();

export type LoginSchemaType = z.TypeOf<typeof loginSchema>;

export const LoginResponseSchema = z
  .object({
    token: z.string(),
    id: z.string(),
    userName: z.string(),
    email: z.string(),
  })
  .strict();

export type LoginResponseSchemaType = z.TypeOf<typeof LoginResponseSchema>;
