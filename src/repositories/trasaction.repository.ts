import { IsNull } from "typeorm";

import AppDataSource from "../services/database.service";
import { RequestFieldError } from "../services/error.service";

import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";
import { Transaction } from "../entities/transaction.entity";

const repository = AppDataSource.getRepository(Transaction);

export const TransactionRepository = {
    getTransactionById({ id }: { id: string }) {
        return repository.findOne({
            where: { id, deletedAt: IsNull() },
            select: ['id', 'senderUser', 'receiverUser', 'amount', 'description']
        });
    },

    listTransactions({ userId }: { userId: string }) {
        return repository.find({
            where: [
                { senderUserId: userId, deletedAt: IsNull() },
                { receiverUserId: userId, deletedAt: IsNull() },
            ],
            select: ['id', 'senderUser', 'receiverUser', 'amount', 'description']
        });
    },

    createTransaction({ userId, receiverUserId, amount, description }: { userId: string, receiverUserId: string, amount: number, description?: string }) {
        return repository.manager.transaction(async (tsx) => {
            const userRepository = tsx.getRepository(User);
            const accountRepository = tsx.getRepository(Account);

            const senderUser = await userRepository.findOneOrFail({
                where: { id: userId },
                relations: ['account']
            });

            const receiverUser = await userRepository.findOneOrFail({
                where: { id: receiverUserId },
                relations: ['account']
            });

            if (senderUser.account.accountValue < amount) {
                throw new RequestFieldError("User does not have money for the transfer");
            }

            senderUser.account.accountValue -= amount;
            receiverUser.account.accountValue += amount;

            await accountRepository.save(senderUser.account);
            await accountRepository.save(receiverUser.account);

            const transaction = new Transaction();

            transaction.senderUserId = userId;
            transaction.receiverUserId = receiverUserId;
            transaction.amount = amount;
            transaction.description = description;

            await tsx.save(transaction);

            return transaction;
        });
    },

    createDeposit({ receiverUserId, amount, description }: { receiverUserId: string, amount: number, description?: string }) {
        return repository.manager.transaction(async (tsx) => {
            const userRepository = tsx.getRepository(User);
            const accountRepository = tsx.getRepository(Account);

            const receiverUser = await userRepository.findOneOrFail({
                where: { id: receiverUserId },
                relations: ['account']
            });

            receiverUser.account.accountValue += amount;

            await accountRepository.save(receiverUser.account);

            const transaction = new Transaction();

            transaction.amount = amount;
            transaction.description = description;
            transaction.receiverUserId = receiverUserId;

            await tsx.save(transaction);

            return transaction;
        });
    },

  updateTransfer({ id, isSent }: { id: string, isSent: boolean }) {
    return repository.update({ id }, { mailSent: isSent });
  },
};