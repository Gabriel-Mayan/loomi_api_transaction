import { z } from "zod";

import { startTransactionSchema } from "../validations/trasaction.validation";

export type IStartTransactionRequest = z.infer<typeof startTransactionSchema>;

export type ITransactionCompletedMailSend = {
    to: {
        sender?: string;
        reciver: string;
    };
    details: {
        transferId: string;
        amount: number;
        description?: string;
        senderName?: string;
        reciverName: string;
    }
}