import { z } from "zod";

export const startTransactionSchema = z.object({
  receiverUserId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export const getTransactionDetailsSchema = z.object({
  transactionId: z.string().uuid(),
});
