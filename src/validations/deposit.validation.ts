import { z } from "zod";

export const depositSchema = z.object({
  receiverUserId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

