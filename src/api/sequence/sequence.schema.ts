import { z } from 'zod';

export const addSequenceSchema = z.object({
  sequence: z.number().array(),
});

export type AddSequenceSchema = z.infer<typeof addSequenceSchema>;
