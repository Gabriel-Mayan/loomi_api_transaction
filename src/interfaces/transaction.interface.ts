import { z } from "zod";

import { startTransactionSchema } from "../validations/trasaction.validation";

export type IStartTransactionSchema = z.infer<typeof startTransactionSchema>;

export type ITransactionCompletedMailSend = {
    to: {
        sender: string;
        reciver: string;
    };
    details: {
        transferId: string;
        amount: number;
        description: string | undefined;
        senderName: string;
        reciverName: string;
    }
}