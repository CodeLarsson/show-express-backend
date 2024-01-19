import { z } from 'zod';

export const catSchema = z
  .object({
    name: z.string(),
    race: z.string(),
    favouriteFood: z.string(),
    accepsBellyRubs: z.boolean(),
    id: z.string().optional(),
  })
  .strict();

export type Cat = z.infer<typeof catSchema>;
