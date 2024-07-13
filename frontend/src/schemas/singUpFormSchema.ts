import { z } from "zod";

export const signUpFormSchema = z.object({
  fullname: z.string().trim().min(10, {
    message: `Must be 10 or more charaters long`,
  }),

  age: z.number().gte(18).int(),

  location: z.string().trim().min(3, {
    message: `Must be 3 or more charaters long`,
  }),

  phone: z.string().length(10).trim(),

  email: z.string().email(),

  password: z
    .string()
    .min(8, {
      message: `Must be 8 or more charaters long`,
    })
    .trim(),
});

export type FormSchema = z.infer<typeof signUpFormSchema>;
