import { serviceMailSender } from "../services/messagery.service";
import { ITransactionCompletedMailSend } from "../interfaces/transaction.interface";
import { TransactionRepository } from "../repositories/trasaction.repository";
import { InternalError, RequestFieldError } from "../services/error.service";

export const transactionCompletedMailSend = async ({ to, details }: ITransactionCompletedMailSend) => {
    await serviceMailSender({ topic: 'transaction-success', message: { to, details } });
};

export const transactionCompletedMailSent = async ({ transferId: id, isSent }: { transferId: string, isSent: boolean }) => {
    const transfer = await TransactionRepository.getTransactionById({ id });

    if (!transfer) {
        throw new RequestFieldError("Transfer does not exist...");
    };

    const transferUpdated = await TransactionRepository.updateTransfer({ id: transfer.id, isSent });

    if (!transferUpdated.affected) {
        throw new InternalError("Error when updating transfer...", { extras: { transfer_info: { id: transfer.id, isSent } } });
    };

    return true;
};
