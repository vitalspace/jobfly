import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: `Must be 8 or more charaters long`,
    })
    .trim(),
});

export type FormSchema = z.infer<typeof formSchema>;
