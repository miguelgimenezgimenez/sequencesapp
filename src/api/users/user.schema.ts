import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';


export const accessDataSchema = z.object({
  email: z.string()
    .email()
    .transform(value => sanitizeHtml(value)),
  password: z.string()
    .min(6, "Password should be at least 6 characters long.")
    .transform(value => sanitizeHtml(value)),
});


export type AccessDataSchema = z.infer<typeof accessDataSchema>;
