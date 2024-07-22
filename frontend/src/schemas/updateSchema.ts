import { z } from "zod";

export const formSchema = z.object({
  avatar: z.string().trim(),

  fullname: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  age: z.number().gte(10).int(),

  location: z.string().trim().min(3, {
    message: `Must be 3 or more characters long`,
  }),

  phone: z.string().length(10).trim(),

  email: z.string().email(),
});

export type FormSchema = z.infer<typeof formSchema>;