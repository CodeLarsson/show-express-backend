import { z } from 'zod';

export const catSchema = z
  .object({
    name: z.string(),
    breed: z.string(),
    favouriteFood: z.string(),
    accepsBellyRubs: z.boolean(),
    age: z.number(),
    image: z.string().optional(),
    description: z.string().optional(),
    adopted: z.boolean(),
    id: z.string().optional(),
  })
  .strict();

export type Cat = z.infer<typeof catSchema>;
