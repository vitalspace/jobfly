import { z } from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  company: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  employment: z.string().trim().min(8, {
    message: `Must be 8 or more characters long`,
  }),

  location: z.string().trim().min(6, {
    message: `Must be 6 or more characters long`,
  }),

  salary: z.number().int(),

  description: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  inthisrole: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  skills: z.string().trim().min(10, {
    message: `Must be 10 or more characters long`,
  }),

  level: z.string().trim().min(2, {
    message: `Must be 2 or more characters long`,
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
