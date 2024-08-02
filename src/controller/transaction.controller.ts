import { Request } from '../interfaces/express.interface';
import { IStartTransactionSchema } from '../interfaces/transaction.interface';

import { UserRepository } from '../repositories/user.repository';
import { TransactionRepository } from '../repositories/trasaction.repository';

import { RequestFieldError } from '../services/error.service';
import { transactionCompletedMailSend } from '../helpers/mail.helper';

export const startTransaction: Request<IStartTransactionSchema> = async (request, response) => {
    const { user } = request;
    const { receiverUserId, amount, description } = request.body;

    const reciver = await UserRepository.getUserById({ id: receiverUserId });

    if (!reciver) {
        throw new RequestFieldError("Reciver does not exist...");
    };

    const transfer = await TransactionRepository.createTransaction({ userId: user.id, receiverUserId: reciver.id, amount, description });

    transactionCompletedMailSend({ 
        to: { 
            sender: user.email,
            reciver: reciver.email,
        },
        details: {
            transferId: transfer.id,
            amount,
            description,
            senderName: user.name,
            reciverName: reciver.name,            
        }
    });

    return response.status(200).send({ message: "Transfer sent successfully!" });
};

export const getTransactionDetails: Request = async (request, response) => {
    const { transactionId } = request.params;

    const transaction = await TransactionRepository.getTransactionById({ id: transactionId });

    return response.status(200).send({ transaction });
};

export const getUserTransactions: Request = async (request, response) => {
    const { user } = request;

    const transactions = await TransactionRepository.listTransactions({ userId: user.id });

    return response.status(200).send({ transactions });
};
